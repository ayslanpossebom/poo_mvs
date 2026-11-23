import { FlowChallenge } from '../types';

export const FLOW_CHALLENGES: FlowChallenge[] = [
  {
    id: 'flow_1',
    phaseId: 1,
    title: 'Fluxo Fundamental de Cadastro de Aluno',
    context: 'Um usuário digita o nome e as notas em um formulário e clica no botão "Salvar". Ordene os passos corretos do ciclo MVC.',
    correctSteps: [
      { id: 'f1_s1', order: 1, text: 'Usuário preenche os dados e clica no botão "Salvar" na interface.', layer: 'USER' },
      { id: 'f1_s2', order: 2, text: 'View captura os dados dos inputs e dispara o evento para o Controller.', layer: 'VIEW' },
      { id: 'f1_s3', order: 3, text: 'Controller valida os parâmetros e instancia um novo Aluno no Model.', layer: 'CONTROLLER' },
      { id: 'f1_s4', order: 4, text: 'Model valida as regras de negócio internas e é persistido no Repositório.', layer: 'MODEL' },
      { id: 'f1_s5', order: 5, text: 'Controller recebe a confirmação e solicita à View que exiba a mensagem de sucesso.', layer: 'CONTROLLER' },
      { id: 'f1_s6', order: 6, text: 'View atualiza a tela apresentando a confirmação visual ao usuário.', layer: 'VIEW' }
    ],
    explanation: 'O fluxo se inicia na interação do usuário com a View, transita pelo Controller que orquestra e consulta o Model, e retorna pelo Controller para que a View renderize o estado atualizado.',
    hints: [
      { level: 1, costXp: 15, text: 'Tudo começa com a ação do Usuário na View.' },
      { level: 2, costXp: 25, text: 'A View nunca fala diretamente com o Model; passa pelo Controller.' },
      { level: 3, costXp: 35, text: 'Ordem: Usuário -> View -> Controller -> Model -> Controller -> View.' }
    ],
    xp: 200
  },
  {
    id: 'flow_2',
    phaseId: 2,
    title: 'Fluxo de Consulta e Cálculo de Média',
    context: 'O professor solicita ver a lista de notas com a média calculada de cada estudante.',
    correctSteps: [
      { id: 'f2_s1', order: 1, text: 'Usuário seleciona a opção "Exibir Boletim Geral" na interface.', layer: 'USER' },
      { id: 'f2_s2', order: 2, text: 'View repassa a intenção de consulta para o Controller.', layer: 'VIEW' },
      { id: 'f2_s3', order: 3, text: 'Controller requisita ao AlunoRepository a lista completa de alunos.', layer: 'CONTROLLER' },
      { id: 'f2_s4', order: 4, text: 'Cada objeto Aluno no Model executa o método calcularMedia() com base em suas notas.', layer: 'MODEL' },
      { id: 'f2_s5', order: 5, text: 'Controller entrega a lista de alunos processada para a View.', layer: 'CONTROLLER' },
      { id: 'f2_s6', order: 6, text: 'View renderiza a tabela formatada com nomes e médias calculadas.', layer: 'VIEW' }
    ],
    explanation: 'A obtenção de dados e os cálculos matemáticos ocorrem no Model, enquanto o Controller faz a ponte e a View cuida da diagramação estética da tabela.',
    hints: [
      { level: 1, costXp: 15, text: 'O usuário clica na tela, o Controller busca no repositório, os objetos calculam suas médias.' },
      { level: 2, costXp: 25, text: 'O cálculo matemático da média acontece no Model.' },
      { level: 3, costXp: 35, text: 'Seleção -> Notificação -> Busca no Repo -> Cálculo no Model -> Repasse -> Renderização.' }
    ],
    xp: 200
  },
  {
    id: 'flow_3',
    phaseId: 3,
    title: 'Fluxo de Tratamento de Dados Inválidos',
    context: 'O usuário digita uma nota com valor 15.0 (acima do limite permitido de 10.0). Organize a cadeia de resposta.',
    correctSteps: [
      { id: 'f3_s1', order: 1, text: 'Usuário digita a nota 15.0 e submete o formulário.', layer: 'USER' },
      { id: 'f3_s2', order: 2, text: 'View envia os valores inseridos para o método salvar do Controller.', layer: 'VIEW' },
      { id: 'f3_s3', order: 3, text: 'Controller tenta criar o objeto Aluno ou atualizar sua nota no Model.', layer: 'CONTROLLER' },
      { id: 'f3_s4', order: 4, text: 'Model detecta nota > 10 e lança IllegalArgumentException("Nota máxima é 10").', layer: 'MODEL' },
      { id: 'f3_s5', order: 5, text: 'Controller captura a exceção e instrui a View a exibir o alerta de validação.', layer: 'CONTROLLER' },
      { id: 'f3_s6', order: 6, text: 'View destaca o campo de nota em vermelho e mostra o texto de erro ao usuário.', layer: 'VIEW' }
    ],
    explanation: 'O Model é o guardião das invariantes de negócio. Quando ele rejeita dados inválidos lançando uma exceção, o Controller faz o tratamento e delega a exibição do alerta amigável à View.',
    hints: [
      { level: 1, costXp: 15, text: 'Quem identifica que a nota é inválida? O Model, ao proteger seu estado.' },
      { level: 2, costXp: 25, text: 'O Controller captura a exceção e avisa a View.' },
      { level: 3, costXp: 35, text: 'Envio -> Controller tenta salvar -> Model lança erro -> Controller trata -> View avisa.' }
    ],
    xp: 220
  },
  {
    id: 'flow_4',
    phaseId: 4,
    title: 'Fluxo de Requisição Web (Cliente / Servidor)',
    context: 'Um cliente envia uma requisição HTTP GET para a rota "/alunos/42". Organize o ciclo de vida da requisição no MVC.',
    correctSteps: [
      { id: 'f4_s1', order: 1, text: 'Navegador cliente dispara requisição HTTP GET /alunos/42.', layer: 'USER' },
      { id: 'f4_s2', order: 2, text: 'Roteador HTTP direciona a requisição para o método AlunoController.obterAluno(42).', layer: 'CONTROLLER' },
      { id: 'f4_s3', order: 3, text: 'Controller solicita a entidade ao AlunoRepository passando o ID 42.', layer: 'CONTROLLER' },
      { id: 'f4_s4', order: 4, text: 'Model busca o registro no banco de dados e retorna o objeto Aluno.', layer: 'MODEL' },
      { id: 'f4_s5', order: 5, text: 'Controller injeta o objeto Aluno no template HTML ou gera JSON (View).', layer: 'CONTROLLER' },
      { id: 'f4_s6', order: 6, text: 'View renderiza a resposta HTTP 200 OK enviada de volta ao navegador.', layer: 'VIEW' }
    ],
    explanation: 'No contexto web, o Controller recebe o disparo de rota da rede, obtém as entidades de negócio do Model, e delega para a engine de View a geração do HTML ou JSON de resposta.',
    hints: [
      { level: 1, costXp: 15, text: 'A requisição HTTP atinge primeiro a rota mapeada no Controller.' },
      { level: 2, costXp: 25, text: 'O Controller busca o Model e monta a resposta através da View.' },
      { level: 3, costXp: 35, text: 'HTTP Request -> Controller Route -> Repo/Model -> Retorno Model -> View Template -> HTTP 200.' }
    ],
    xp: 220
  },
  {
    id: 'flow_5',
    phaseId: 1,
    title: 'Fluxo de Inicialização e Bootstrapping da Aplicação',
    context: 'O programa Java acabou de ser executado (ponto de entrada Main). Ordene a montagem das instâncias.',
    correctSteps: [
      { id: 'f5_s1', order: 1, text: 'Método public static void main() é iniciado pela Máquina Virtual.', layer: 'USER' },
      { id: 'f5_s2', order: 2, text: 'Instanciação do AlunoRepository (camada de persistência/Model).', layer: 'MODEL' },
      { id: 'f5_s3', order: 3, text: 'Instanciação da AlunoView (camada de interface com usuário).', layer: 'VIEW' },
      { id: 'f5_s4', order: 4, text: 'Instanciação do AlunoController recebendo Repository e View via injeção.', layer: 'CONTROLLER' },
      { id: 'f5_s5', order: 5, text: 'Controller chama controller.iniciar(), apresentando a tela inicial pela View.', layer: 'CONTROLLER' }
    ],
    explanation: 'Na montagem limpa de dependências (Composition Root no Main), criamos primeiro os componentes independentes (Repository e View) e em seguida injetamos ambos no construtor do Controller.',
    hints: [
      { level: 1, costXp: 15, text: 'O Controller precisa que o Repository e a View já existam para recebê-los.' },
      { level: 2, costXp: 25, text: 'main() inicia -> instancia Repo e View -> instancia Controller -> inicia o loop.' },
      { level: 3, costXp: 35, text: 'Main -> Repo -> View -> Controller(repo, view) -> Iniciar.' }
    ],
    xp: 210
  }
];
