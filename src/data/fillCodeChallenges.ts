import { CodeFillChallenge } from '../types';

export const FILL_CODE_CHALLENGES: CodeFillChallenge[] = [
  {
    id: 'fill_1',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'EASY',
    title: 'Encapsulamento do Atributo Nome',
    instructions: 'Complete a declaração do atributo para garantir que ele seja acessível apenas dentro da classe Aluno.',
    codeTemplate: `public class Aluno {
    {{BLANK}} String nome;
    private double nota;

    public Aluno(String nome, double nota) {
        this.nome = nome;
        this.nota = nota;
    }
}`,
    options: ['private', 'public', 'protected', 'transient'],
    correctAnswer: 'private',
    explanation: 'No padrão MVC e em POO, atributos do Model devem ser declarados com o modificador "private" para garantir o encapsulamento dos dados.',
    hints: [
      { level: 1, costXp: 15, text: 'Qual modificador restringe o acesso exclusivamente à própria classe?' },
      { level: 2, costXp: 25, text: 'É o modificador padrão para variáveis de instância privadas em Java.' },
      { level: 3, costXp: 35, text: 'A palavra-chave é "private".' }
    ],
    xp: 150
  },
  {
    id: 'fill_2',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'EASY',
    title: 'Construtor da Classe Model',
    instructions: 'Complete a atribuição do parâmetro ao atributo interno do objeto.',
    codeTemplate: `public class Produto {
    private String nome;
    private double preco;

    public Produto(String nome, double preco) {
        {{BLANK}} = nome;
        this.preco = preco;
    }
}`,
    options: ['this.nome', 'super.nome', 'Produto.nome', 'var.nome'],
    correctAnswer: 'this.nome',
    explanation: 'A palavra-chave "this" faz referência à instância atual do objeto, diferenciando o atributo "this.nome" do parâmetro "nome".',
    hints: [
      { level: 1, costXp: 15, text: 'Como diferenciamos o atributo da classe do parâmetro de mesmo nome?' },
      { level: 2, costXp: 25, text: 'Usamos a palavra-chave que referencia o objeto corrente.' },
      { level: 3, costXp: 35, text: 'A resposta é "this.nome".' }
    ],
    xp: 150
  },
  {
    id: 'fill_3',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'MEDIUM',
    title: 'Método Getter para Leitura Segura',
    instructions: 'Complete a assinatura do método getter para o atributo de nota.',
    codeTemplate: `public class Aluno {
    private double nota;

    public {{BLANK}} getNota() {
        return this.nota;
    }
}`,
    options: ['double', 'void', 'boolean', 'String'],
    correctAnswer: 'double',
    explanation: 'O método getNota() precisa retornar o mesmo tipo do atributo protegido, que é "double".',
    hints: [
      { level: 1, costXp: 15, text: 'Qual é o tipo de retorno do método de acordo com o tipo da variável "nota"?' },
      { level: 2, costXp: 25, text: 'Se "nota" é um double, o getter deve retornar um double.' },
      { level: 3, costXp: 35, text: 'O tipo é "double".' }
    ],
    xp: 150
  },
  {
    id: 'fill_4',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'MEDIUM',
    title: 'Regra de Negócio: Cálculo de Média',
    instructions: 'Complete o cálculo aritmético correto da média entre duas notas no Model.',
    codeTemplate: `public class Aluno {
    private double nota1;
    private double nota2;

    public double calcularMedia() {
        return {{BLANK}};
    }
}`,
    options: [
      '(nota1 + nota2) / 2.0',
      'nota1 + nota2 / 2.0',
      '(nota1 * nota2) / 2.0',
      'Math.max(nota1, nota2)'
    ],
    correctAnswer: '(nota1 + nota2) / 2.0',
    explanation: 'A precedência de operadores exige parênteses: (nota1 + nota2) / 2.0 soma primeiro as duas notas antes da divisão por 2.',
    hints: [
      { level: 1, costXp: 15, text: 'Atenção à precedência matemática entre adição e divisão.' },
      { level: 2, costXp: 25, text: 'Sem parênteses, apenas a nota2 seria dividida por 2.' },
      { level: 3, costXp: 35, text: 'A expressão correta é "(nota1 + nota2) / 2.0".' }
    ],
    xp: 150
  },
  {
    id: 'fill_5',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'HARD',
    title: 'Adicionando ao Repositório',
    instructions: 'Complete o método do AlunoRepository que armazena uma nova instância na lista interna.',
    codeTemplate: `public class AlunoRepository {
    private List<Aluno> alunos = new ArrayList<>();

    public void salvar(Aluno aluno) {
        {{BLANK}};
    }
}`,
    options: [
      'this.alunos.add(aluno)',
      'this.alunos.push(aluno)',
      'this.alunos.insert(aluno)',
      'this.alunos.append(aluno)'
    ],
    correctAnswer: 'this.alunos.add(aluno)',
    explanation: 'Na interface java.util.List em Java, o método padrão para adicionar um elemento a uma lista é "add(E e)".',
    hints: [
      { level: 1, costXp: 15, text: 'Qual é o método padrão da interface java.util.List para inserir elementos?' },
      { level: 2, costXp: 25, text: 'Não confunda com JavaScript (.push) ou Python (.append).' },
      { level: 3, costXp: 35, text: 'Em Java Collections, o método é ".add(elemento)".' }
    ],
    xp: 160
  },
  {
    id: 'fill_6',
    phaseId: 3,
    pillar: 'VIEW',
    difficulty: 'EASY',
    title: 'Exibição de Dados na View',
    instructions: 'Complete a instrução da View que apresenta o nome do aluno formatado no terminal.',
    codeTemplate: `public class AlunoView {
    public void exibirAluno(Aluno aluno) {
        {{BLANK}}("Aluno: " + aluno.getNome());
    }
}`,
    options: [
      'System.out.println',
      'Console.writeLine',
      'echo',
      'print_screen'
    ],
    correctAnswer: 'System.out.println',
    explanation: 'System.out.println é a instrução padrão da biblioteca padrão do Java para emitir linhas no console padrão (saída padrão da View).',
    hints: [
      { level: 1, costXp: 15, text: 'Qual é a chamada padrão de impressão de linha em Java?' },
      { level: 2, costXp: 25, text: 'Pertence ao pacote java.lang.System.' },
      { level: 3, costXp: 35, text: 'Use "System.out.println".' }
    ],
    xp: 150
  },
  {
    id: 'fill_7',
    phaseId: 3,
    pillar: 'VIEW',
    difficulty: 'MEDIUM',
    title: 'Iteração da View sobre a Lista',
    instructions: 'Complete o laço de repetição enhanced-for (for-each) para exibir cada aluno.',
    codeTemplate: `public class AlunoView {
    public void exibirLista(List<Aluno> lista) {
        for ({{BLANK}} : lista) {
            System.out.println(aluno.getNome() + " - Média: " + aluno.calcularMedia());
        }
    }
}`,
    options: [
      'Aluno aluno',
      'var item in',
      'String aluno',
      'Object item'
    ],
    correctAnswer: 'Aluno aluno',
    explanation: 'No enhanced-for de Java, declaramos o tipo e a variável local correspondente aos itens da lista: "Aluno aluno".',
    hints: [
      { level: 1, costXp: 15, text: 'A lista contém objetos do tipo Aluno.' },
      { level: 2, costXp: 25, text: 'A variável local deve se chamar "aluno" para casar com o corpo do laço.' },
      { level: 3, costXp: 35, text: 'A declaração é "Aluno aluno".' }
    ],
    xp: 150
  },
  {
    id: 'fill_8',
    phaseId: 4,
    pillar: 'CONTROLLER',
    difficulty: 'MEDIUM',
    title: 'Injeção de Dependência no Controller',
    instructions: 'Complete o construtor do AlunoController recebendo e atribuindo o repositório e a view.',
    codeTemplate: `public class AlunoController {
    private AlunoRepository repository;
    private AlunoView view;

    public AlunoController(AlunoRepository repo, AlunoView view) {
        this.repository = {{BLANK}};
        this.view = view;
    }
}`,
    options: ['repo', 'new AlunoRepository()', 'null', 'this.repo'],
    correctAnswer: 'repo',
    explanation: 'Injeção de dependência via construtor: atribuímos o parâmetro "repo" ao campo interno "this.repository", promovendo baixo acoplamento.',
    hints: [
      { level: 1, costXp: 15, text: 'Qual parâmetro recebido no construtor corresponde ao repositório?' },
      { level: 2, costXp: 25, text: 'Atribua o parâmetro "repo" ao campo this.repository.' },
      { level: 3, costXp: 35, text: 'A resposta é "repo".' }
    ],
    xp: 150
  },
  {
    id: 'fill_9',
    phaseId: 4,
    pillar: 'CONTROLLER',
    difficulty: 'HARD',
    title: 'Fluxo do Controller: Delegar e Atualizar View',
    instructions: 'Complete a linha onde o Controller busca os dados no Model e os repassa para a View.',
    codeTemplate: `public class AlunoController {
    private AlunoRepository repository;
    private AlunoView view;

    public void listarTodos() {
        List<Aluno> lista = repository.listar();
        {{BLANK}}(lista);
    }
}`,
    options: [
      'view.exibirLista',
      'System.out.println',
      'repository.exibir',
      'this.listarTodos'
    ],
    correctAnswer: 'view.exibirLista',
    explanation: 'O Controller não imprime dados diretamente; ele repassa a lista obtida do repositório para o método "view.exibirLista(lista)".',
    hints: [
      { level: 1, costXp: 15, text: 'Qual objeto e método têm a função de mostrar a lista ao usuário?' },
      { level: 2, costXp: 25, text: 'O Controller chama o método de exibição da View.' },
      { level: 3, costXp: 35, text: 'A chamada correta é "view.exibirLista".' }
    ],
    xp: 160
  },
  {
    id: 'fill_10',
    phaseId: 1,
    pillar: 'ARCHITECTURE',
    difficulty: 'MEDIUM',
    title: 'Ponto de Entrada (Main)',
    instructions: 'Complete o método Main criando a instância do Controller conectada à View e ao Repositório.',
    codeTemplate: `public class Main {
    public static void main(String[] args) {
        AlunoRepository repo = new AlunoRepository();
        AlunoView view = new AlunoView();
        AlunoController controller = {{BLANK}}(repo, view);
        controller.iniciar();
    }
}`,
    options: [
      'new AlunoController',
      'AlunoController.getInstance',
      'AlunoController.build',
      'createController'
    ],
    correctAnswer: 'new AlunoController',
    explanation: 'Em Java tradicional, instanciamos a classe controladora passando as dependências através do operador "new AlunoController(repo, view)".',
    hints: [
      { level: 1, costXp: 15, text: 'Como instanciamos um novo objeto passando argumentos no construtor em Java?' },
      { level: 2, costXp: 25, text: 'Utilizamos a palavra-chave "new" seguida do nome da classe.' },
      { level: 3, costXp: 35, text: 'A instrução é "new AlunoController".' }
    ],
    xp: 150
  }
];
