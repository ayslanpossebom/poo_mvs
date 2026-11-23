import { DebugChallenge } from '../types';

export const DEBUG_CHALLENGES: DebugChallenge[] = [
  {
    id: 'debug_1',
    phaseId: 1,
    pillar: 'ARCHITECTURE',
    title: 'Acoplamento de Interface no Model',
    codeSnippet: `public class Aluno {
    private String nome;
    private double nota;

    public void setNota(double nota) {
        if (nota < 0 || nota > 10) {
            // PROBLEMA AQUI:
            JOptionPane.showMessageDialog(null, "Nota inválida! Digite entre 0 e 10.");
        } else {
            this.nota = nota;
        }
    }
}`,
    question: 'Qual é o grave erro arquitetural presente no método setNota() da classe Aluno?',
    architecturalFlaw: 'O Model depende diretamente de uma biblioteca gráfica (JOptionPane da View).',
    options: [
      'O nome do método setNota deveria começar com letra maiúscula.',
      'O Model está chamando JOptionPane da View diretamente, violando o desacoplamento e impedindo reuso em outras plataformas.',
      'A condição (nota < 0 || nota > 10) deveria usar && em vez de ||.',
      'A palavra-chave this é proibida dentro do bloco else.'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `public class Aluno {
    private String nome;
    private double nota;

    public void setNota(double nota) {
        if (nota < 0 || nota > 10) {
            throw new IllegalArgumentException("Nota deve estar entre 0 e 10.");
        }
        this.nota = nota;
    }
}`,
    explanation: 'O Model nunca deve instanciar componentes de interface gráfica como JOptionPane. Se o estado for inválido, o Model deve lançar uma exceção de domínio (como IllegalArgumentException) e deixar a View/Controller decidir como informar o usuário.',
    hints: [
      { level: 1, costXp: 20, text: 'Observe a biblioteca que cria janelas e caixas de diálogo no código.' },
      { level: 2, costXp: 30, text: 'JOptionPane pertence ao pacote gráfico Swing. O que ele está fazendo dentro do Model?' },
      { level: 3, costXp: 40, text: 'O Model está acoplado à interface visual através de JOptionPane.' }
    ],
    xp: 200
  },
  {
    id: 'debug_2',
    phaseId: 2,
    pillar: 'MODEL',
    title: 'Falta de Encapsulamento de Atributos',
    codeSnippet: `public class Produto {
    public String nome;
    public double preco;

    public Produto(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
    }
}`,
    question: 'Por que declarar os atributos como "public" viola as boas práticas do Model no MVC?',
    architecturalFlaw: 'Quebra de encapsulamento: qualquer classe externa pode corromper o estado do objeto diretamente.',
    options: [
      'Porque classes com atributos públicos não compilam em Java 17+.',
      'Permite que classes externas (como View ou Controller) alterem os valores diretamente sem qualquer validação de integridade.',
      'Aumenta o consumo de banda de internet na aplicação.',
      'Porque em Java todos os atributos devem ser sempre static.'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `public class Produto {
    private String nome;
    private double preco;

    public Produto(String nome, double preco) {
        setNome(nome);
        setPreco(preco);
    }

    public String getNome() { return nome; }
    public void setNome(String nome) {
        if (nome == null || nome.isBlank()) throw new IllegalArgumentException("Nome inválido");
        this.nome = nome;
    }

    public double getPreco() { return preco; }
    public void setPreco(double preco) {
        if (preco < 0) throw new IllegalArgumentException("Preço não pode ser negativo");
        this.preco = preco;
    }
}`,
    explanation: 'Ao deixar os atributos privados e expor apenas métodos com validação (getters e setters), o Model garante que ninguém atribua preços negativos ou nomes vazios.',
    hints: [
      { level: 1, costXp: 20, text: 'Pense no que aconteceria se alguém fizesse produto.preco = -500.0 em qualquer parte do código.' },
      { level: 2, costXp: 30, text: 'Atributos públicos quebram a proteção de estado interno (encapsulamento).' },
      { level: 3, costXp: 40, text: 'Permite que qualquer classe altere os atributos sem validação.' }
    ],
    xp: 200
  },
  {
    id: 'debug_3',
    phaseId: 3,
    pillar: 'VIEW',
    title: 'Regra de Negócio Perdida na View',
    codeSnippet: `public class AlunoView {
    public void exibirRelatorio(Aluno aluno) {
        System.out.println("Aluno: " + aluno.getNome());
        // PROBLEMA AQUI:
        double mediaFinal = (aluno.getNota1() * 2 + aluno.getNota2() * 3) / 5.0;
        if (mediaFinal >= 7.0) {
            System.out.println("Situação: APROVADO");
        } else {
            System.out.println("Situação: REPROVADO");
        }
    }
}`,
    question: 'Qual é o problema arquitetural na implementação de AlunoView?',
    architecturalFlaw: 'A View está calculando média ponderada e aplicando critérios de aprovação acadêmica.',
    options: [
      'A View não deveria usar System.out.println.',
      'O cálculo da média ponderada e a regra de aprovação/reprovação pertencem ao Model, e não à View.',
      'A palavra "REPROVADO" deveria estar em minúsculas.',
      'A View precisa obrigatoriamente retornar um valor booleano.'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `// No Model (Aluno.java):
public double calcularMediaPonderada() {
    return (this.nota1 * 2 + this.nota2 * 3) / 5.0;
}
public boolean estaAprovado() {
    return calcularMediaPonderada() >= 7.0;
}

// Na View (AlunoView.java):
public void exibirRelatorio(Aluno aluno) {
    System.out.println("Aluno: " + aluno.getNome());
    System.out.println("Média: " + aluno.calcularMediaPonderada());
    System.out.println("Situação: " + (aluno.estaAprovado() ? "APROVADO" : "REPROVADO"));
}`,
    explanation: 'A regra de aprovação e os pesos da média são regras de negócio institucionais. Se a instituição alterar a média de 7.0 para 6.0, apenas a classe Aluno (Model) deve ser alterada.',
    hints: [
      { level: 1, costXp: 20, text: 'Onde estão as fórmulas matemáticas e regras de aprovação?' },
      { level: 2, costXp: 30, text: 'A View só deve exibir dados; não deve decidir se alguém passou de ano.' },
      { level: 3, costXp: 40, text: 'O cálculo da média ponderada e o critério de aprovação pertencem ao Model.' }
    ],
    xp: 200
  },
  {
    id: 'debug_4',
    phaseId: 3,
    pillar: 'VIEW',
    title: 'Acesso Direto ao Repositório pela View',
    codeSnippet: `public class AlunoView {
    private AlunoRepository repository = new AlunoRepository();

    public void botaoBuscarClicado(String matricula) {
        // PROBLEMA AQUI:
        Aluno a = repository.buscarPorMatricula(matricula);
        exibirDetalhes(a);
    }
}`,
    question: 'Por que a View buscar dados diretamente no repositório viola o MVC?',
    architecturalFlaw: 'A View ignora o Controller e acessa diretamente a persistência de dados.',
    options: [
      'Porque matricula não pode ser do tipo String.',
      'A View está ignorando o papel do Controller, acoplando a interface diretamente à camada de persistência.',
      'Porque o repositório deveria ser estático.',
      'Não há erro: a View sempre deve acessar o banco de dados diretamente.'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `public class AlunoView {
    private AlunoController controller;

    public void setController(AlunoController controller) {
        this.controller = controller;
    }

    public void botaoBuscarClicado(String matricula) {
        // Notifica o Controller para orquestrar a busca
        controller.solicitarBuscaAluno(matricula);
    }
}`,
    explanation: 'A View não deve gerenciar fontes de dados. Quando um evento ocorre na tela, ela deve delegar a solicitação para o Controller, que então consulta o Model/Repository e devolve o resultado formatado.',
    hints: [
      { level: 1, costXp: 20, text: 'Quem deveria ser o intermediário entre a View e o Repositório?' },
      { level: 2, costXp: 30, text: 'O Controller foi completamente excluído do fluxo.' },
      { level: 3, costXp: 40, text: 'A View está ignorando o Controller e acessando diretamente o repositório.' }
    ],
    xp: 200
  },
  {
    id: 'debug_5',
    phaseId: 4,
    pillar: 'CONTROLLER',
    title: 'O Antipadrão "Fat Controller"',
    codeSnippet: `public class AlunoController {
    public void cadastrarAluno(String nome, double n1, double n2) {
        // PROBLEMA AQUI: Lógica de banco e domínio misturadas no Controller
        if (nome == null || nome.length() < 3) return;
        double media = (n1 + n2) / 2;
        String status = media >= 7 ? "APROVADO" : "REPROVADO";
        
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/escola");
        PreparedStatement ps = con.prepareStatement("INSERT INTO aluno VALUES (?, ?, ?)");
        ps.setString(1, nome);
        ps.setDouble(2, media);
        ps.setString(3, status);
        ps.executeUpdate();
    }
}`,
    question: 'Quais são as violações graves cometidas por este Controller?',
    architecturalFlaw: 'Fat Controller: contém regras de validação de domínio, cálculos matemáticos e código SQL JDBC direto.',
    options: [
      'O Controller utilizou JDBC em vez de JPA.',
      'O Controller assumiu papel de Model (cálculo de média/status) e de Persistência (SQL bruto), sobrecarregando o componente.',
      'Faltou colocar uma anotação @Override no método cadastrarAluno.',
      'O nome do método deveria ter sido escrito em português arcaico.'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `public class AlunoController {
    private AlunoRepository repository;
    private AlunoView view;

    public void cadastrarAluno(String nome, double n1, double n2) {
        try {
            Aluno novoAluno = new Aluno(nome, n1, n2);
            repository.salvar(novoAluno);
            view.exibirMensagemSucesso("Aluno cadastrado com sucesso!");
        } catch (IllegalArgumentException e) {
            view.exibirMensagemErro(e.getMessage());
        }
    }
}`,
    explanation: 'O Controller deve ser leve ("Skinny Controller"). Ele não deve fazer contas de negócio nem abrir conexões SQL. Ele apenas cria a entidade, repassa para o repositório e avisa a View.',
    hints: [
      { level: 1, costXp: 20, text: 'Veja quantas coisas diferentes esse único método está fazendo.' },
      { level: 2, costXp: 30, text: 'Cálculo de média + SQL direto dentro do Controller caracterizam um Fat Controller.' },
      { level: 3, costXp: 40, text: 'O Controller assumiu o papel de Model e persistência direta com SQL.' }
    ],
    xp: 220
  },
  {
    id: 'debug_6',
    phaseId: 4,
    pillar: 'CONTROLLER',
    title: 'Impressão Direta no Console pelo Controller',
    codeSnippet: `public class AlunoController {
    private AlunoRepository repository;

    public void listarAlunos() {
        List<Aluno> lista = repository.listarTodos();
        // PROBLEMA AQUI:
        System.out.println("======== RELATÓRIO DE ALUNOS ========");
        for (Aluno a : lista) {
            System.out.println("Nome: " + a.getNome() + " | Nota: " + a.getNota());
        }
    }
}`,
    question: 'Qual princípio do MVC é quebrado quando o Controller imprime diretamente no terminal com System.out.println?',
    architecturalFlaw: 'O Controller assumiu a função de apresentação que cabe exclusivamente à View.',
    options: [
      'O Controller não pode usar laços do tipo for.',
      'O Controller está assumindo o papel de renderização e apresentação da View, violando a separação de responsabilidades.',
      'A classe Aluno não possui método getNota().',
      'O método listarAlunos deveria retornar void e não fazer nada.'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `public class AlunoController {
    private AlunoRepository repository;
    private AlunoView view;

    public void listarAlunos() {
        List<Aluno> lista = repository.listarTodos();
        // Delega a apresentação visual para a View especialista
        view.exibirListaDeAlunos(lista);
    }
}`,
    explanation: 'Se um dia o sistema mudar para uma interface gráfica (JavaFX ou Web), o Controller precisaria ser reescrito caso contivesse System.out.println. Ao delegar para view.exibirListaDeAlunos(), o Controller permanece idêntico.',
    hints: [
      { level: 1, costXp: 20, text: 'Qual camada tem a atribuição exclusiva de exibir saídas visuais ao usuário?' },
      { level: 2, costXp: 30, text: 'System.out.println no Controller amarra o controlador ao console de texto.' },
      { level: 3, costXp: 40, text: 'O Controller está assumindo o papel de apresentação da View.' }
    ],
    xp: 200
  },
  {
    id: 'debug_7',
    phaseId: 2,
    pillar: 'MODEL',
    title: 'Model Notificando a Interface com Acoplamento Forte',
    codeSnippet: `public class ContaBancaria {
    private double saldo;
    private JanelaExtratoView janela; // PROBLEMA

    public void sacar(double valor) {
        if (valor <= saldo) {
            saldo -= valor;
            janela.atualizarSaldoNaTela(saldo); // PROBLEMA
        }
    }
}`,
    question: 'Por que ter um atributo "JanelaExtratoView" dentro da classe ContaBancaria é prejudicial?',
    architecturalFlaw: 'O Model passa a depender de uma classe específica de interface gráfica.',
    options: [
      'Porque contas bancárias não podem realizar operações de saque.',
      'Acopla rigidamente a entidade de negócio a uma janela gráfica específica, impedindo uso em caixas eletrônicos, APIs ou testes automatizados.',
      'O método sacar deveria ser static.',
      'Porque o saldo deveria ser do tipo int.'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `public class ContaBancaria {
    private double saldo;

    public boolean sacar(double valor) {
        if (valor > 0 && valor <= saldo) {
            saldo -= valor;
            return true;
        }
        return false;
    }
    public double getSaldo() { return saldo; }
}`,
    explanation: 'O Model é puro. Ele executa a operação matemática e validação. O Controller chama conta.sacar(valor) e, se bem-sucedido, comanda a atualização da View.',
    hints: [
      { level: 1, costXp: 20, text: 'Como você rodaria um teste unitário dessa conta sem instanciar uma Janela gráfica?' },
      { level: 2, costXp: 30, text: 'O Model nunca deve conter instâncias de janelas ou interfaces.' },
      { level: 3, costXp: 40, text: 'Acopla rigidamente o negócio a uma janela gráfica específica.' }
    ],
    xp: 210
  },
  {
    id: 'debug_8',
    phaseId: 1,
    pillar: 'ARCHITECTURE',
    title: 'Dependência Cíclica (Loop de Acoplamento)',
    codeSnippet: `public class AlunoView {
    private AlunoModel model;
    public void desenhar() {
        model.setView(this);
    }
}
public class AlunoModel {
    private AlunoView view;
    public void alterarNome(String n) {
        view.redesenharTudo();
    }
}`,
    question: 'Qual é o perigo da dependência mútua direta entre Model e View sem a mediação do Controller?',
    architecturalFlaw: 'Dependência circular forte entre Model e View.',
    options: [
      'Gera vazamento de memória e impede reutilização de ambos, criando acoplamento circular que o padrão MVC justamente visa eliminar.',
      'Java não permite classes com nomes terminados em View.',
      'O método desenhar() só funciona se for nativo em C++.',
      'Não há problema algum em dependência cíclica.'
    ],
    correctIndex: 0,
    improvedCodeSnippet: `// No MVC tradicional com desacoplamento:
// O Model é independente (pode usar Observer Pattern / Eventos se necessário, sem conhecer a View concreta)
// O Controller atua como mediador entre a intenção do usuário e a resposta na interface.`,
    explanation: 'O MVC foi concebido para que o Model nunca conheça a View. Uma dependência mútua direta destrói a modularidade e a manutenibilidade do sistema.',
    hints: [
      { level: 1, costXp: 20, text: 'Pense em dependência bidirecional A conhece B e B conhece A.' },
      { level: 2, costXp: 30, text: 'Isso gera acoplamento circular difícil de testar e manter.' },
      { level: 3, costXp: 40, text: 'Impede reutilização de ambos e cria acoplamento circular.' }
    ],
    xp: 220
  },
  {
    id: 'debug_9',
    phaseId: 4,
    pillar: 'CONTROLLER',
    title: 'Instanciação Rígida em vez de Injeção de Dependências',
    codeSnippet: `public class AlunoController {
    private AlunoRepository repo = new AlunoRepositoryMySQL(); // PROBLEMA

    public void salvar(Aluno a) {
        repo.adicionar(a);
    }
}`,
    question: 'Como podemos melhorar o design do AlunoController para facilitar testes automatizados e flexibilidade?',
    architecturalFlaw: 'Instanciação direta e rígida acoplada à implementação concreta MySQL.',
    options: [
      'Tornar o repositório público e estático.',
      'Receber a abstração do repositório via construtor (Injeção de Dependência), permitindo injetar um repositório em memória nos testes.',
      'Remover a classe AlunoRepository e usar variáveis globais.',
      'Chamar o Garbage Collector manualmente com System.gc().'
    ],
    correctIndex: 1,
    improvedCodeSnippet: `public class AlunoController {
    private AlunoRepository repo;

    // Injeção de Dependência via construtor:
    public AlunoController(AlunoRepository repo) {
        this.repo = repo;
    }

    public void salvar(Aluno a) {
        repo.adicionar(a);
    }
}`,
    explanation: 'A Injeção de Dependência permite que nos testes unitários passemos um repositório falso (mock/em memória), sem precisar de um servidor MySQL real rodando.',
    hints: [
      { level: 1, costXp: 20, text: 'Como fazemos para o Controller não ficar preso a uma classe concreta de banco?' },
      { level: 2, costXp: 30, text: 'Receber a dependência no construtor é a base da Injeção de Dependências.' },
      { level: 3, costXp: 40, text: 'Receber a dependência via construtor (Injeção de Dependência).' }
    ],
    xp: 210
  },
  {
    id: 'debug_10',
    phaseId: 3,
    pillar: 'VIEW',
    title: 'Formatando Dados no Local Errado',
    codeSnippet: `public class Aluno {
    private double nota;
    // PROBLEMA AQUI:
    public String getNotaFormatadaEmReaisComIcone() {
        return "⭐ R$ " + String.format("%.2f", nota);
    }
}`,
    question: 'Por que colocar formatação de ícones visuais e texto decorado dentro da classe Aluno (Model) é uma má prática?',
    architecturalFlaw: 'O Model assumiu formatação estética específica para exibição visual.',
    options: [
      'Porque notas de alunos não devem ser formatadas com símbolo de moeda ou ícones visuais da tela.',
      'A linguagem Java proíbe o uso de emojis dentro de classes Model.',
      'O método String.format é muito lento e não deve ser usado.',
      'O método deveria ser privado.'
    ],
    correctIndex: 0,
    improvedCodeSnippet: `// No Model (Aluno.java) - apenas dados puros:
public double getNota() {
    return nota;
}

// Na View (AlunoView.java) - especialista em formatação estética:
public String formatarNotaParaTela(double nota) {
    return String.format("%.2f", nota);
}`,
    explanation: 'O Model deve manter dados brutos puros. Se outra interface (ex: relatório em PDF, exportação CSV ou aplicativo móvel) quiser exibir a nota de outra forma, a responsabilidade de formatação é daquela View específica.',
    hints: [
      { level: 1, costXp: 20, text: 'Ícones decorativos e símbolos visuais pertencem à apresentação gráfica.' },
      { level: 2, costXp: 30, text: 'O Model deve conter apenas dados de negócio numéricos e textuais puros.' },
      { level: 3, costXp: 40, text: 'Notas de alunos não devem ter formatação estética e ícones no Model.' }
    ],
    xp: 200
  }
];
