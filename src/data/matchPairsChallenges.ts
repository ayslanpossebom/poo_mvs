import { MatchChallenge } from '../types';

export const MATCH_CHALLENGES: MatchChallenge[] = [
  {
    id: 'match_1',
    phaseId: 1,
    title: 'Pilares Fundamentais do MVC',
    description: 'Associe cada responsabilidade primária ao seu respectivo pilar arquitetural.',
    pairs: [
      { id: 'm1_1', concept: 'Armazenar dados e validar regras de negócio', targetPillar: 'MODEL', explanation: 'O Model é a autoridade sobre os dados e as regras essenciais da aplicação.' },
      { id: 'm1_2', concept: 'Renderizar telas, formulários e capturar eventos do usuário', targetPillar: 'VIEW', explanation: 'A View é responsável por toda a interface de apresentação gráfica ou textual.' },
      { id: 'm1_3', concept: 'Intermediar a comunicação e coordenar o fluxo entre as camadas', targetPillar: 'CONTROLLER', explanation: 'O Controller atua como o maestro, gerenciando as requisições e atualizações.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Lembre-se: Model = Dados/Regras, View = Apresentação, Controller = Fluxo/Coordenação.' },
      { level: 2, costXp: 25, text: 'A interface nunca deve conter regras de negócio.' },
      { level: 3, costXp: 35, text: 'Regras -> Model; Apresentação -> View; Coordenação -> Controller.' }
    ],
    xp: 150
  },
  {
    id: 'match_2',
    phaseId: 2,
    title: 'Componentes do Domínio (Model)',
    description: 'Relacione os conceitos de Orientação a Objetos aos papéis desempenhados no Model.',
    pairs: [
      { id: 'm2_1', concept: 'Atributos privados e métodos de cálculo de domínio', targetPillar: 'MODEL', explanation: 'Atributos e lógica de domínio pertencem às entidades do Model.' },
      { id: 'm2_2', concept: 'Abstração de repositório em memória para persistência de listas', targetPillar: 'MODEL', explanation: 'Repositories e DAOs compõem a camada de persistência associada ao Model.' },
      { id: 'm2_3', concept: 'Caixas de diálogo de confirmação visual ao usuário', targetPillar: 'VIEW', explanation: 'Caixas de diálogo são elementos puramente visuais da View.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Entidades e repositórios são partes integrantes do Model.' },
      { level: 2, costXp: 25, text: 'Caixas de diálogo e popups pertencem à View.' },
      { level: 3, costXp: 35, text: 'Dados e repositórios -> Model; Caixas de diálogo -> View.' }
    ],
    xp: 150
  },
  {
    id: 'match_3',
    phaseId: 3,
    title: 'Entradas e Saídas na View',
    description: 'Identifique quais elementos e ações pertencem especificamente à View e quais pertencem ao Controller.',
    pairs: [
      { id: 'm3_1', concept: 'Ler entrada do teclado com Scanner ou formulário HTML', targetPillar: 'VIEW', explanation: 'A captação do input bruto do usuário é realizada pela View.' },
      { id: 'm3_2', concept: 'Interpretar a escolha do usuário e decidir qual método acionar', targetPillar: 'CONTROLLER', explanation: 'A interpretação de intenção de fluxo cabe ao Controller.' },
      { id: 'm3_3', concept: 'Garantir que a idade mínima para matrícula é 16 anos', targetPillar: 'MODEL', explanation: 'Regras de validação de domínio residem no Model.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Leitura bruta é View; Decisão de roteamento é Controller; Regra de validação é Model.' },
      { level: 2, costXp: 25, text: 'Quem decide qual método chamar com base na opção é o Controller.' },
      { level: 3, costXp: 35, text: 'Scanner -> View; Roteamento -> Controller; Validação de idade -> Model.' }
    ],
    xp: 150
  },
  {
    id: 'match_4',
    phaseId: 4,
    title: 'Mediação e Tratamento no Controller',
    description: 'Associe as responsabilidades de mediação à camada correta.',
    pairs: [
      { id: 'm4_1', concept: 'Receber dados da View e instanciar um novo Aluno no Model', targetPillar: 'CONTROLLER', explanation: 'O Controller recebe parâmetros e cria ou delega a criação do objeto no Model.' },
      { id: 'm4_2', concept: 'Calcular se o aluno foi Aprovado ou Reprovado com base na nota', targetPillar: 'MODEL', explanation: 'A regra de aprovação acadêmica é pura regra de negócio do Model.' },
      { id: 'm4_3', concept: 'Formatar a tabela de notas com cores e quebras de linha', targetPillar: 'VIEW', explanation: 'Formatação estética é tarefa exclusiva da View.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Formatação estética é View; Regra de aprovação é Model; Instanciar a partir de input é Controller.' },
      { level: 2, costXp: 25, text: 'O Controller coordena o fluxo entre as camadas.' },
      { level: 3, costXp: 35, text: 'Instanciação por requisição -> Controller; Aprovação -> Model; Formatação -> View.' }
    ],
    xp: 150
  },
  {
    id: 'match_5',
    phaseId: 1,
    title: 'Tratamento de Exceções e Erros',
    description: 'Onde cada tipo de tratamento deve ser alocado segundo o MVC?',
    pairs: [
      { id: 'm5_1', concept: 'Lançar IllegalArgumentException quando uma nota for menor que zero', targetPillar: 'MODEL', explanation: 'O Model protege seu estado lançando exceções caso receba dados ilegais.' },
      { id: 'm5_2', concept: 'Capturar exceções do Model e instruir a View a exibir mensagem de erro amigável', targetPillar: 'CONTROLLER', explanation: 'O Controller intercepta falhas e determina a mensagem de feedback a apresentar.' },
      { id: 'm5_3', concept: 'Renderizar mensagem de erro destacada em vermelho na tela', targetPillar: 'VIEW', explanation: 'A apresentação visual do aviso com cor e estilo é papel da View.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Quem lança o erro de domínio? Quem orquestra o tratamento? Quem pinta a mensagem na tela?' },
      { level: 2, costXp: 25, text: 'Lançar exceção de dado inválido -> Model.' },
      { level: 3, costXp: 35, text: 'Lançamento -> Model; Orquestração -> Controller; Estilização -> View.' }
    ],
    xp: 160
  },
  {
    id: 'match_6',
    phaseId: 2,
    title: 'Encapsulamento e Ocultação de Informação',
    description: 'Classifique as declarações de membros de classe conforme o pilar.',
    pairs: [
      { id: 'm6_1', concept: 'List<Aluno> listaAlunos mantida em coleção privada', targetPillar: 'MODEL', explanation: 'Coleções de entidades e dados estruturados são gerenciados pelo Model/Repository.' },
      { id: 'm6_2', concept: 'Scanner teclado = new Scanner(System.in)', targetPillar: 'VIEW', explanation: 'A infraestrutura de leitura de terminal pertence à View.' },
      { id: 'm6_3', concept: 'void processarComandoMenu(int opcao)', targetPillar: 'CONTROLLER', explanation: 'A lógica de decisão sobre opções de menu é gerida pelo Controller.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Scanner é View; List<Aluno> é Model; processarMenu é Controller.' },
      { level: 2, costXp: 25, text: 'Identifique o propósito de cada membro.' },
      { level: 3, costXp: 35, text: 'Lista -> Model; Scanner -> View; Processamento -> Controller.' }
    ],
    xp: 150
  },
  {
    id: 'match_7',
    phaseId: 3,
    title: 'Desacoplamento e Reusabilidade',
    description: 'Relacione os benefícios de arquitetura limpa a cada camada.',
    pairs: [
      { id: 'm7_1', concept: 'Poder substituir a interface de console por uma tela gráfica sem alterar regras', targetPillar: 'VIEW', explanation: 'A camada View pode ser substituída sem afetar as regras de negócio.' },
      { id: 'm7_2', concept: 'Poder rodar testes unitários em lógica matemática sem abrir janelas visuais', targetPillar: 'MODEL', explanation: 'O Model pode ser exaustivamente testado de forma rápida e headless.' },
      { id: 'm7_3', concept: 'Facilidade para redirecionar o fluxo para uma nova tela após o salvamento', targetPillar: 'CONTROLLER', explanation: 'O Controller define os fluxos de navegação e transições de tela.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Trocar interface sem mexer em regras beneficia a flexibilidade da View.' },
      { level: 2, costXp: 25, text: 'Testar regras sem interface é a grande vantagem de isolar o Model.' },
      { level: 3, costXp: 35, text: 'Substituição de UI -> View; Testes puros -> Model; Navegação -> Controller.' }
    ],
    xp: 160
  },
  {
    id: 'match_8',
    phaseId: 4,
    title: 'Padrão MVC em Aplicações Web',
    description: 'Mapeie o equivalente web de cada pilar em frameworks modernos como Spring MVC.',
    pairs: [
      { id: 'm8_1', concept: 'JPA Entities, Services e Classes de Negócio (@Entity, @Service)', targetPillar: 'MODEL', explanation: 'Entidades e serviços representam o domínio (Model) em aplicações enterprise.' },
      { id: 'm8_2', concept: 'Templates Thymeleaf, Páginas HTML/CSS ou React Components', targetPillar: 'VIEW', explanation: 'São tecnologias de renderização de interface (View).' },
      { id: 'm8_3', concept: 'Classes com anotações de rotas HTTP (@RestController, @GetMapping)', targetPillar: 'CONTROLLER', explanation: 'Rotas HTTP e endpoints REST desempenham o papel de Controller.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Pense nas camadas de uma aplicação Spring Boot.' },
      { level: 2, costXp: 25, text: '@RestController recebe a requisição; Entity armazena; HTML exibe.' },
      { level: 3, costXp: 35, text: 'Entities -> Model; HTML/React -> View; @RestController -> Controller.' }
    ],
    xp: 160
  },
  {
    id: 'match_9',
    phaseId: 2,
    title: 'Imutabilidade e DTOs (Data Transfer Objects)',
    description: 'Associe conceitos de tráfego de dados aos componentes corretos.',
    pairs: [
      { id: 'm9_1', concept: 'Objeto AlunoDTO contendo apenas dados públicos para transporte', targetPillar: 'MODEL', explanation: 'DTOs são representações de dados que pertencem ao espectro do Model.' },
      { id: 'm9_2', concept: 'Mapear campos de formulário para o DTO e passar adiante', targetPillar: 'CONTROLLER', explanation: 'O Controller recebe o DTO e faz o bind ou validação inicial.' },
      { id: 'm9_3', concept: 'Desenhar inputs desabilitados para dados de somente leitura', targetPillar: 'VIEW', explanation: 'Desabilitar campos e renderizar readonly é responsabilidade da View.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'DTO é Model; Conversão de payload é Controller; Estilo readonly é View.' },
      { level: 2, costXp: 25, text: 'Identifique onde cada etapa de transporte ocorre.' },
      { level: 3, costXp: 35, text: 'Estrutura DTO -> Model; Validação/Bind -> Controller; Estilo do input -> View.' }
    ],
    xp: 160
  },
  {
    id: 'match_10',
    phaseId: 1,
    title: 'Antipadrões e Más Práticas',
    description: 'Identifique em qual camada uma violação arquitetural típica costuma ocorrer.',
    pairs: [
      { id: 'm10_1', concept: 'Fazer cálculo de imposto dentro do evento onClick de um botão', targetPillar: 'VIEW', explanation: 'Colocar cálculos na View é um antipadrão gravíssimo de acoplamento.' },
      { id: 'm10_2', concept: 'Classe Aluno contendo chamada a JOptionPane.showMessageDialog()', targetPillar: 'MODEL', explanation: 'O Model nunca deve invocar diretamente caixas de diálogo ou janelas gráficas.' },
      { id: 'm10_3', concept: 'Executar query SQL bruta com SELECT/INSERT dentro do método do Controller', targetPillar: 'CONTROLLER', explanation: 'O Fat Controller executando SQL diretamente viola a abstração do repositório/Model.' }
    ],
    hints: [
      { level: 1, costXp: 15, text: 'Onde o erro foi colocado indevidamente no código?' },
      { level: 2, costXp: 25, text: 'onClick com cálculo -> View; Model abrindo diálogo -> Model; Controller com SQL -> Controller.' },
      { level: 3, costXp: 35, text: 'Cálculo no botão -> View; JOptionPane no Aluno -> Model; SQL no Controller -> Controller.' }
    ],
    xp: 170
  }
];
