import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- FASE 1: VILA DA ARQUITETURA ---
  {
    id: 'quiz_1_1',
    phaseId: 1,
    pillar: 'ARCHITECTURE',
    difficulty: 'EASY',
    question: 'Qual é o principal objetivo do padrão arquitetural MVC (Model-View-Controller)?',
    options: [
      'Acelerar a velocidade de compilação do código Java.',
      'Separar as responsabilidades entre dados, interface e controle da aplicação.',
      'Substituir a necessidade de escrever testes unitários.',
      'Unificar interface e banco de dados em um único arquivo para simplificar o deploy.'
    ],
    correctIndex: 1,
    explanation: 'O MVC tem como princípio fundamental a Separação de Responsabilidades (SoC), dividindo o software em Model (dados/regras), View (apresentação) e Controller (orquestração).',
    hints: [
      { level: 1, costXp: 10, text: 'Pense no princípio fundamental de engenharia de software chamado SoC (Separation of Concerns).' },
      { level: 2, costXp: 20, text: 'A sigla representa três componentes com papéis bem distintos.' },
      { level: 3, costXp: 30, text: 'A resposta correta envolve separar dados, interface e controle.' }
    ],
    xp: 100,
    timeLimitSeconds: 25
  },
  {
    id: 'quiz_1_2',
    phaseId: 1,
    pillar: 'ARCHITECTURE',
    difficulty: 'EASY',
    question: 'O que acontece em um sistema monolítico sem organização arquitetural ("código espaguete")?',
    options: [
      'O sistema se torna automaticamente imune a falhas de rede.',
      'Alterações em uma tela podem quebrar regras de negócio em partes não relacionadas do sistema.',
      'O consumo de memória RAM cai para zero.',
      'A manutenção se torna mais simples porque tudo está no mesmo lugar.'
    ],
    correctIndex: 1,
    explanation: 'Sem separação de camadas, o forte acoplamento faz com que uma simples alteração na interface do usuário afete diretamente cálculos de negócios e persistência, gerando efeitos colaterais imprevisíveis.',
    hints: [
      { level: 1, costXp: 10, text: 'Pense no alto acoplamento entre regras e interface gráfica.' },
      { level: 2, costXp: 20, text: 'Quando tudo está misturado, modificar um botão pode afetar o cálculo de um imposto.' },
      { level: 3, costXp: 30, text: 'Procure a alternativa que menciona que alterações em uma tela quebram regras de negócio.' }
    ],
    xp: 100,
    timeLimitSeconds: 20
  },
  {
    id: 'quiz_1_3',
    phaseId: 1,
    pillar: 'ARCHITECTURE',
    difficulty: 'MEDIUM',
    question: 'Qual camada no MVC deve conter a regra: "O desconto máximo concedido a um cliente não pode ultrapassar 15%"?',
    options: [
      'View, para impedir que o usuário digite um valor inválido no formulário.',
      'Controller, porque ele é responsável por todas as decisões lógicas.',
      'Model, pois é a camada responsável pelos dados e regras de negócio da aplicação.',
      'Main, porque é a classe executável inicial.'
    ],
    correctIndex: 2,
    explanation: 'Regras de negócio pertencem exclusivamente ao Model. Mesmo que a View ou Controller façam validações de formato (ex: número positivo), a regra essencial do domínio vive no Model.',
    hints: [
      { level: 1, costXp: 10, text: 'Qual camada é o coração do domínio da aplicação e gerencia as regras e dados?' },
      { level: 2, costXp: 20, text: 'Mesmo se trocarmos a View gráfica por um app mobile ou CLI, essa regra de desconto deve continuar valendo.' },
      { level: 3, costXp: 30, text: 'O Model é o responsável pelas regras de negócio.' }
    ],
    xp: 100,
    timeLimitSeconds: 25
  },
  {
    id: 'quiz_1_4',
    phaseId: 1,
    pillar: 'ARCHITECTURE',
    difficulty: 'MEDIUM',
    question: 'Qual é o papel primário do Controller no fluxo de interação do usuário?',
    options: [
      'Desenhar botões e janelas na tela com CSS ou Swing.',
      'Receber a intenção do usuário, coordenar ações entre Model e View, e definir o próximo passo.',
      'Armazenar permanentemente os dados em disco sem auxílio do Model.',
      'Executar a compilação do código-fonte em tempo de execução.'
    ],
    correctIndex: 1,
    explanation: 'O Controller atua como maestro: ele recebe o evento/ação do usuário, aciona o Model para processar a lógica necessária e atualiza ou envia os dados para a View.',
    hints: [
      { level: 1, costXp: 10, text: 'Pense no Controller como um intermediário ou maestro.' },
      { level: 2, costXp: 20, text: 'Ele conecta a intenção da View com a execução do Model.' },
      { level: 3, costXp: 30, text: 'Ele coordena ações entre as camadas.' }
    ],
    xp: 100,
    timeLimitSeconds: 20
  },

  // --- FASE 2: FLORESTA DOS DADOS (MODEL) ---
  {
    id: 'quiz_2_1',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'EASY',
    question: 'Em uma classe Model em Java, qual modificador de acesso é o mais indicado para atributos como "nome" e "saldo"?',
    options: [
      'public, para que qualquer classe possa alterar os valores livremente.',
      'private, aplicando o princípio do encapsulamento e protegendo os dados.',
      'static, para que todos os objetos compartilhem a mesma variável.',
      'transient, para ignorar os atributos na memória.'
    ],
    correctIndex: 1,
    explanation: 'O modificador private garante o encapsulamento, impedindo que outras camadas alterem atributos diretamente sem passar pelas validações de métodos da própria classe.',
    hints: [
      { level: 1, costXp: 10, text: 'Lembre-se do pilar de Orientação a Objetos: Encapsulamento.' },
      { level: 2, costXp: 20, text: 'Queremos proteger o estado interno do objeto de acessos externos diretos.' },
      { level: 3, costXp: 30, text: 'O modificador private restringe o acesso ao escopo da própria classe.' }
    ],
    xp: 100,
    timeLimitSeconds: 20
  },
  {
    id: 'quiz_2_2',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'MEDIUM',
    question: 'Por que o Model NÃO deve importar ou ter referências diretas a componentes de interface gráfica (View)?',
    options: [
      'Porque a linguagem Java proíbe importar bibliotecas gráficas em classes com atributos.',
      'Para garantir independência: o Model pode ser reutilizado com qualquer interface (web, mobile, console, API REST) sem sofrer alterações.',
      'Porque interfaces gráficas só podem ser criadas dentro do método main.',
      'Para reduzir o custo de licença do software.'
    ],
    correctIndex: 1,
    explanation: 'O desacoplamento do Model é essencial. Ao manter o Model limpo de detalhes visuais, ele pode ser reutilizado em qualquer plataforma (Web, Mobile, Desktop, Batch) sem qualquer mudança nas regras de negócio.',
    hints: [
      { level: 1, costXp: 10, text: 'Imagine reutilizar as mesmas classes de negócio em um app Android e em um site Web.' },
      { level: 2, costXp: 20, text: 'Se o Model depender da interface, trocar a interface exigiria reescrever o Model.' },
      { level: 3, costXp: 30, text: 'Independência e reusabilidade são os motivos chave.' }
    ],
    xp: 100,
    timeLimitSeconds: 25
  },
  {
    id: 'quiz_2_3',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'MEDIUM',
    question: 'Considere a classe Produto no Model. Onde deve ficar a validação que impede preço negativo?',
    options: [
      'No método de impressão da View.',
      'No construtor e no setter do atributo preco dentro da classe Produto (Model).',
      'Apenas no arquivo de configuração do banco de dados.',
      'No método de clique do mouse do sistema operacional.'
    ],
    correctIndex: 1,
    explanation: 'A integridade dos dados e as invariantes da entidade devem ser garantidas no próprio Model, especificamente no construtor e nos métodos setters (ex: lançando IllegalArgumentException se o preço for menor que zero).',
    hints: [
      { level: 1, costXp: 10, text: 'O objeto nunca deve permitir que seu estado fique inválido.' },
      { level: 2, costXp: 20, text: 'O construtor e o método setPreco() são os guardiões do estado.' },
      { level: 3, costXp: 30, text: 'No construtor e no setter da classe Produto.' }
    ],
    xp: 100,
    timeLimitSeconds: 25
  },
  {
    id: 'quiz_2_4',
    phaseId: 2,
    pillar: 'MODEL',
    difficulty: 'HARD',
    question: 'Qual é o papel de um padrão complementar como "Repository" no ecossistema do Model?',
    options: [
      'Criar caixas de diálogo e botões interativos na tela.',
      'Abstrair e isolar as operações de persistência e consulta de dados da regra de negócio das entidades.',
      'Executar animações de transição de janelas.',
      'Controlar a velocidade do processador.'
    ],
    correctIndex: 1,
    explanation: 'O Repository atua como uma coleção em memória para o domínio, mediando a persistência e busca das entidades sem poluir a entidade com detalhes de conexão ou SQL.',
    hints: [
      { level: 1, costXp: 10, text: 'Pense em como os dados são guardados e recuperados (banco ou listas em memória).' },
      { level: 2, costXp: 20, text: 'O Repository serve como uma coleção abstrata de entidades.' },
      { level: 3, costXp: 30, text: 'Abstrair a persistência e consulta de dados.' }
    ],
    xp: 120,
    timeLimitSeconds: 30
  },

  // --- FASE 3: CIDADE DAS INTERFACES (VIEW) ---
  {
    id: 'quiz_3_1',
    phaseId: 3,
    pillar: 'VIEW',
    difficulty: 'EASY',
    question: 'Qual é a principal responsabilidade da camada View?',
    options: [
      'Calcular o valor total de juros compostos de uma fatura.',
      'Exibir dados ao usuário e capturar as entradas e interações do usuário.',
      'Conectar diretamente no banco PostgreSQL para fazer INSERT.',
      'Gerenciar o ciclo de vida dos sockets de rede.'
    ],
    correctIndex: 1,
    explanation: 'A View é a camada de apresentação. Sua única missão é renderizar dados recebidos e coletar cliques, textos digitados ou comandos do usuário.',
    hints: [
      { level: 1, costXp: 10, text: 'View é a interface visível com a qual o usuário interage.' },
      { level: 2, costXp: 20, text: 'Apresentação visual e captura de eventos.' },
      { level: 3, costXp: 30, text: 'Exibir dados e capturar entradas do usuário.' }
    ],
    xp: 100,
    timeLimitSeconds: 20
  },
  {
    id: 'quiz_3_2',
    phaseId: 3,
    pillar: 'VIEW',
    difficulty: 'MEDIUM',
    question: 'Por que a View NÃO deve fazer consultas diretas ao banco de dados (ex: "SELECT * FROM alunos")?',
    options: [
      'Porque comandos SQL só funcionam se escritos em letra minúscula.',
      'Porque isso acopla a interface com a estrutura do banco e viola a separação de responsabilidades do MVC.',
      'Porque a View não tem acesso ao teclado do computador.',
      'Porque o banco de dados só aceita conexões vindas de navegadores.'
    ],
    correctIndex: 1,
    explanation: 'Permitir que a View acesse o banco cria alto acoplamento, tornando impossível trocar o banco ou a interface de forma independente e expondo vulnerabilidades de segurança graves.',
    hints: [
      { level: 1, costXp: 10, text: 'A camada de apresentação deve depender apenas dos modelos que ela recebe.' },
      { level: 2, costXp: 20, text: 'Acesso a dados deve ser mediado pelo Model/Repository através do Controller.' },
      { level: 3, costXp: 30, text: 'Gera alto acoplamento e viola a separação de responsabilidades.' }
    ],
    xp: 100,
    timeLimitSeconds: 25
  },
  {
    id: 'quiz_3_3',
    phaseId: 3,
    pillar: 'VIEW',
    difficulty: 'MEDIUM',
    question: 'Em uma aplicação console Java organizada em MVC, qual código é típico de uma classe View?',
    options: [
      'System.out.println("=== CADASTRO DE ALUNOS ==="); e scanner.nextLine();',
      'double imposto = salario * 0.275;',
      'connection.prepareStatement("INSERT INTO tb_aluno VALUES (?, ?)");',
      'Thread.sleep(10000);'
    ],
    correctIndex: 0,
    explanation: 'Mensagens no console, leitura via Scanner e menus visuais são responsabilidades clássicas da camada View em aplicações texto/console.',
    hints: [
      { level: 1, costXp: 10, text: 'O que lida diretamente com apresentação em tela e leitura de input no terminal?' },
      { level: 2, costXp: 20, text: 'System.out.println e Scanner são ferramentas típicas de interface console em Java.' },
      { level: 3, costXp: 30, text: 'A alternativa com System.out.println e scanner.nextLine().' }
    ],
    xp: 100,
    timeLimitSeconds: 20
  },
  {
    id: 'quiz_3_4',
    phaseId: 3,
    pillar: 'VIEW',
    difficulty: 'HARD',
    question: 'Se um usuário clicar no botão "Excluir Registro", qual deve ser a conduta imediata da View?',
    options: [
      'Executar o comando DELETE no banco de dados e fechar o programa.',
      'Notificar o Controller sobre o evento (intenção de excluir), repassando o identificador do registro.',
      'Calcular as perdas financeiras da exclusão.',
      'Congelar a tela até reiniciar o computador.'
    ],
    correctIndex: 1,
    explanation: 'A View apenas sinaliza o evento para o Controller ("o usuário clicou em excluir o item X"). O Controller decide como tratar, pede confirmação ou solicita a exclusão ao Model.',
    hints: [
      { level: 1, costXp: 10, text: 'A View delega a tomada de decisão para o maestro do sistema.' },
      { level: 2, costXp: 20, text: 'O Controller é quem deve orquestrar a exclusão.' },
      { level: 3, costXp: 30, text: 'Notificar o Controller sobre o evento repassando o ID.' }
    ],
    xp: 120,
    timeLimitSeconds: 25
  },

  // --- FASE 4: CASTELO DOS CONTROLADORES (CONTROLLER) ---
  {
    id: 'quiz_4_1',
    phaseId: 4,
    pillar: 'CONTROLLER',
    difficulty: 'EASY',
    question: 'Qual dos seguintes componentes o Controller conecta diretamente?',
    options: [
      'Apenas o disco rígido com a memória RAM.',
      'A View (interface) e o Model (dados e regras de negócio).',
      'O monitor de vídeo com a placa de rede.',
      'O compilador javac com a JVM.'
    ],
    correctIndex: 1,
    explanation: 'O Controller é o elo de ligação entre a View e o Model, garantindo que a interface não precise conversar diretamente com as complexidades internas do Model.',
    hints: [
      { level: 1, costXp: 10, text: 'O Controller fica exatamente no meio do diagrama clássico do MVC.' },
      { level: 2, costXp: 20, text: 'Ele conecta os dois outros pilares.' },
      { level: 3, costXp: 30, text: 'Conecta a View e o Model.' }
    ],
    xp: 100,
    timeLimitSeconds: 20
  },
  {
    id: 'quiz_4_2',
    phaseId: 4,
    pillar: 'CONTROLLER',
    difficulty: 'MEDIUM',
    question: 'O que caracteriza a má prática conhecida como "Fat Controller" (Controlador Gordo)?',
    options: [
      'Um controlador que consome muita memória porque armazena imagens de alta resolução.',
      'Um controlador que assume responsabilidades de regras de negócio e acesso a dados que deveriam estar no Model.',
      'Um controlador que possui mais de 3 métodos.',
      'Um controlador que usa Java ao invés de Python.'
    ],
    correctIndex: 1,
    explanation: 'Um Fat Controller ocorre quando o desenvolvedor coloca cálculos, validações complexas de domínio e queries SQL dentro do Controller, transformando o Model em mero repositório anêmico de dados.',
    hints: [
      { level: 1, costXp: 10, text: 'Pense em sobrecarga de responsabilidades que não pertencem a ele.' },
      { level: 2, costXp: 20, text: 'O Controller deve ser magro (Skinny Controller), delegando as regras para o Model.' },
      { level: 3, costXp: 30, text: 'Controlador assumindo regras de negócio e dados que pertencem ao Model.' }
    ],
    xp: 110,
    timeLimitSeconds: 25
  },
  {
    id: 'quiz_4_3',
    phaseId: 4,
    pillar: 'CONTROLLER',
    difficulty: 'MEDIUM',
    question: 'Ao finalizar o processamento de uma busca de alunos, o que o Controller deve fazer com a lista encontrada?',
    options: [
      'Imprimir a lista com System.out.println dentro do próprio Controller.',
      'Enviar a lista para o método apropriado da View para que ela a exiba ao usuário.',
      'Apagar a lista da memória para liberar espaço.',
      'Criar uma nova tabela no banco de dados.'
    ],
    correctIndex: 1,
    explanation: 'O Controller não deve imprimir dados diretamente. Ele deve repassar o resultado obtido do Model para a View, que é a especialista em apresentação.',
    hints: [
      { level: 1, costXp: 10, text: 'Quem tem a competência de formatar e mostrar dados ao usuário?' },
      { level: 2, costXp: 20, text: 'A View deve receber o resultado e cuidar da formatação.' },
      { level: 3, costXp: 30, text: 'Enviar a lista para o método apropriado da View.' }
    ],
    xp: 110,
    timeLimitSeconds: 20
  },
  {
    id: 'quiz_4_4',
    phaseId: 4,
    pillar: 'ARCHITECTURE',
    difficulty: 'HARD',
    question: 'Em uma arquitetura MVC corporativa, qual é a vantagem de usar Injeção de Dependências no Controller?',
    options: [
      'Permitir testar o Controller com objetos simulados (Mocks) e desacoplar implementações concretas.',
      'Aumentar o tamanho do arquivo .class gerado.',
      'Impedir que outros programadores leiam o código-fonte.',
      'Tornar obrigatório o uso de banco de dados relacional.'
    ],
    correctIndex: 0,
    explanation: 'Injetar a View e o Repository/Service no construtor do Controller permite criar testes unitários automatizados facilmente, substituindo dependências reais por Mocks rápidos e seguros.',
    hints: [
      { level: 1, costXp: 10, text: 'Pense em testabilidade de software e inversão de controle.' },
      { level: 2, costXp: 20, text: 'Facilita criar testes unitários passando mocks no construtor.' },
      { level: 3, costXp: 30, text: 'Permitir testar com mocks e desacoplar implementações.' }
    ],
    xp: 130,
    timeLimitSeconds: 25
  }
];
