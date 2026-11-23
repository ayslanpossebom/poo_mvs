import { NPCInfo } from '../types';

export interface PlayableHero {
  id: 'Ada' | 'Turing' | 'Linus';
  name: string;
  title: string;
  description: string;
  avatarKey: string;
  themeColor: string;
  bonusTrait: string;
}

export const PLAYABLE_HEROES: PlayableHero[] = [
  {
    id: 'Ada',
    name: 'Ada, a Arquiteta',
    title: 'Pioneira da Lógica',
    description: 'Especialista em estruturar sistemas limpos, modulares e resilientes. Sua visão analítica identifica acoplamentos desnecessários à distância.',
    avatarKey: 'hero_ada',
    themeColor: '#38bdf8',
    bonusTrait: '+10% XP em desafios de Model e Arquitetura'
  },
  {
    id: 'Turing',
    name: 'Turing, o Maestro',
    title: 'Guardião do Fluxo',
    description: 'Mestre da coordenação de eventos e orquestração de controladores. Domina a sincronia entre a intenção do usuário e a resposta da máquina.',
    avatarKey: 'hero_turing',
    themeColor: '#34d399',
    bonusTrait: '+10% XP em desafios de Controller e Fluxos'
  },
  {
    id: 'Linus',
    name: 'Linus, o Vanguardista',
    title: 'Designer das Interfaces',
    description: 'Focado na experiência do usuário e na integridade visual. Garante que nenhuma regra de negócio suje as telas de apresentação.',
    avatarKey: 'hero_linus',
    themeColor: '#c084fc',
    bonusTrait: '+10% XP em desafios de View e Depuração'
  }
];

export const NPCS_DATA: NPCInfo[] = [
  {
    id: 'npc_byte',
    name: 'Professor Byte',
    title: 'Arquiteto Supremo de CodeLand',
    avatar: 'byte',
    regionId: 1,
    color: '#38bdf8',
    lore: 'O decano dos arquitetos digitais. Testemunhou o nascimento de CodeLand antes que a mistura desordenada de códigos corrompesse as fronteiras do reino.',
    greeting: 'Olá, jovem desenvolvedor! CodeLand precisa desesperadamente de você.',
    dialogueShort: [
      'Bem-vindo à Vila da Arquitetura! Nosso mundo está entrando em colapso porque o código central foi construído sem separação de responsabilidades.',
      'O padrão MVC (Model-View-Controller) é a chave para restaurar a ordem. Ele divide o sistema em três forças harmônicas.',
      'O Model cuida dos dados e regras; a View projeta a interface para os olhos dos cidadãos; o Controller guia e orquestra a comunicação.',
      'Conclua meus desafios introdutórios para conquistar a Insígnia de Arquiteto e abrir caminho para a Floresta dos Dados!'
    ],
    deepExplanation: `### A Essência do Padrão MVC

O padrão arquitetural **Model-View-Controller (MVC)** foi concebido originalmente por Trygve Reenskaug em 1979 e se consolidou como uma das fundações mais sólidas da engenharia de software contemporânea.

#### Por que arquitetar?
Em projetos sem arquitetura definida (chamados de "código espaguete" ou *Big Ball of Mud*):
1. **Alto Acoplamento:** Mudar a cor de um botão na tela pode corromper a fórmula do cálculo de impostos.
2. **Baixa Coesão:** Uma única classe faz tudo: desenha janelas, executa SQL, faz validações matemáticas e emite sons.
3. **Impossibilidade de Testes:** Não é possível testar as regras de negócio sem instanciar janelas gráficas inteiras.

#### Os Três Pilares:
- **MODEL:** É o coração da aplicação. Guarda o estado (dados) e a sabedoria (regras de negócio). Ele **nunca** deve saber que a tela ou o mouse existem!
- **VIEW:** É a face visível. Mostra ao usuário o que é necessário e capta suas intenções (cliques, toques, digitações). Ela **nunca** calcula regras de negócio!
- **CONTROLLER:** É o cérebro condutor. Ouve os eventos da View, aciona o Model para processar as operações e seleciona a View correspondente para renderizar o resultado.`,
    quests: [
      {
        id: 'quest_1_1',
        title: 'O Despertar da Arquitetura',
        description: 'Converse com o Professor Byte e teste seus conhecimentos conceituais no Quiz de Arquitetura.',
        regionId: 1,
        npcId: 'npc_byte',
        challengeType: 'QUIZ',
        challengeId: 'quiz_1_1',
        xpReward: 150,
        coinReward: 25,
        completed: false
      },
      {
        id: 'quest_1_2',
        title: 'Associação de Responsabilidades',
        description: 'Ligue cada conceito de engenharia ao seu respectivo pilar arquitetural.',
        regionId: 1,
        npcId: 'npc_byte',
        challengeType: 'MATCH',
        challengeId: 'match_1',
        xpReward: 200,
        coinReward: 30,
        completed: false
      },
      {
        id: 'quest_1_3',
        title: 'A Ordem da Inicialização',
        description: 'Organize a sequência correta de inicialização do ecossistema MVC no método Main.',
        regionId: 1,
        npcId: 'npc_byte',
        challengeType: 'FLOW',
        challengeId: 'flow_5',
        xpReward: 250,
        coinReward: 40,
        completed: false
      }
    ]
  },
  {
    id: 'npc_modelina',
    name: 'Modelina',
    title: 'Guardiã da Floresta dos Dados',
    avatar: 'modelina',
    regionId: 2,
    color: '#38bdf8',
    lore: 'Protetora das raízes e invariantes de CodeLand. Ela cuida para que os dados permaneçam imaculados, encapsulados e invioláveis contra invasões externas.',
    greeting: 'Saudações! Os dados da floresta estão expostos e desprotegidos. Ajude-me a encapsulá-los!',
    dialogueShort: [
      'Você chegou à Floresta dos Dados! Aqui residem as classes de domínio, os atributos sagrados e as regras de negócio.',
      'Um bom Model é puro: ele deve ser blindado com atributos privados (private), construtores consistentes e métodos claros.',
      'Jamais permita que uma entidade do Model importe classes de interface gráfica! O Model deve ser agnóstico à apresentação.',
      'Resolva os desafios de modelagem e repositório para obter o Cristal do Model!'
    ],
    deepExplanation: `### O Pilar Model: Dados e Regras de Negócio

O **Model** é a camada mais nobre e valiosa de qualquer software. As interfaces mudam com frequência (web, mobile, console, smartwatches), mas as regras de negócio de uma empresa duram décadas.

#### Práticas Essenciais em Java:
1. **Encapsulamento Rigoroso:**
   - Todos os atributos de instância devem ser \`private\`.
   - Modificações de estado só devem ocorrer através de métodos com validações de integridade.
2. **Invariantes de Domínio:**
   - O objeto nunca deve nascer em estado inválido. O construtor deve lançar exceções (\`IllegalArgumentException\`) se receber dados impróprios (ex: nota negativa).
3. **Cálculos de Negócio no Model:**
   - O cálculo da média, da aprovação, do desconto ou do imposto reside nos métodos da própria entidade (ex: \`aluno.calcularMedia()\`).
4. **Camada de Repositório (Repository):**
   - Para que as entidades não fiquem poluídas com comandos de banco ou manipulação de listas, usamos a abstração do Repositório (\`AlunoRepository\`), que oferece métodos de coleção como \`salvar(Aluno a)\` e \`listarTodos()\`.`,
    quests: [
      {
        id: 'quest_2_1',
        title: 'O Segredo do Encapsulamento',
        description: 'Complete as lacunas no código de Aluno para proteger o atributo nome.',
        regionId: 2,
        npcId: 'npc_modelina',
        challengeType: 'CODE_FILL',
        challengeId: 'fill_1',
        xpReward: 200,
        coinReward: 35,
        completed: false
      },
      {
        id: 'quest_2_2',
        title: 'A Lógica da Média Aritmética',
        description: 'Complete o método de cálculo de média dentro da entidade Aluno.',
        regionId: 2,
        npcId: 'npc_modelina',
        challengeType: 'CODE_FILL',
        challengeId: 'fill_4',
        xpReward: 250,
        coinReward: 40,
        completed: false
      },
      {
        id: 'quest_2_3',
        title: 'O Enigma do Repositório',
        description: 'Resolva o Quiz especializado em persistência e regras de domínio.',
        regionId: 2,
        npcId: 'npc_modelina',
        challengeType: 'QUIZ',
        challengeId: 'quiz_2_3',
        xpReward: 220,
        coinReward: 30,
        completed: false
      }
    ]
  },
  {
    id: 'npc_ladyview',
    name: 'Lady View',
    title: 'Grã-Mestra das Interfaces',
    avatar: 'ladyview',
    regionId: 3,
    color: '#c084fc',
    lore: 'Artista visual e arquiteta da Cidade das Interfaces. Constrói janelas reluzentes, botões responsivos e telas expressivas para os habitantes de CodeLand.',
    greeting: 'Bem-vindo à Cidade das Interfaces! A beleza só é perfeita quando respeita a separação.',
    dialogueShort: [
      'Nossa cidade brilha com cores e luzes, mas temos um problema sério: desenvolvedores descuidados colocaram cálculos de notas dentro dos botões!',
      'A View foi feita para renderizar e interagir. Ela lê dados do usuário e imprime relatórios deslumbrantes.',
      'A View NUNCA deve calcular impostos, médias ou fazer conexões diretas com banco de dados!',
      'Ajude-me a purificar as interfaces e conquiste o Cristal da View!'
    ],
    deepExplanation: `### O Pilar View: Apresentação e Interação com o Usuário

A **View** é o ponto de contato sensorial entre a aplicação e o ser humano.

#### Responsabilidades da View:
1. **Apresentação de Dados:**
   - Formatar e exibir os dados recebidos do Model através do Controller (tabelas, textos, cores de status).
2. **Captura de Ações:**
   - Coletar a entrada de dados (via \`Scanner\` em terminal, campos de formulário na Web, eventos de clique).
3. **Sinalização de Eventos:**
   - Notificar o Controller quando o usuário executa uma ação ("o botão Salvar foi clicado").

#### O Que NUNCA Deve Estar na View:
- **Cálculos matemáticos de negócio:** Nada de \`preco - desconto\` ou \`(nota1 + nota2)/2\` na View! Peça ao Model o resultado pronto.
- **SQL / Acesso a Repositório:** A View não sabe o que é banco de dados, nem tabelas ou arquivos em disco.
- **Decisões de fluxo complexo:** A View não decide se o usuário tem permissão para acessar outra tela; ela avisa o Controller e este toma a decisão.`,
    quests: [
      {
        id: 'quest_3_1',
        title: 'Purificando a Exibição',
        description: 'Complete as instruções da classe AlunoView para exibir relatórios no terminal.',
        regionId: 3,
        npcId: 'npc_ladyview',
        challengeType: 'CODE_FILL',
        challengeId: 'fill_6',
        xpReward: 200,
        coinReward: 35,
        completed: false
      },
      {
        id: 'quest_3_2',
        title: 'Eliminando Regras da Interface',
        description: 'Identifique e depure o erro arquitetural de cálculos indevidos dentro da View.',
        regionId: 3,
        npcId: 'npc_ladyview',
        challengeType: 'DEBUG',
        challengeId: 'debug_3',
        xpReward: 300,
        coinReward: 50,
        completed: false
      },
      {
        id: 'quest_3_3',
        title: 'O Mapeamento Visual',
        description: 'Associe as responsabilidades de entrada e saída visual ao pilar correspondente.',
        regionId: 3,
        npcId: 'npc_ladyview',
        challengeType: 'MATCH',
        challengeId: 'match_3',
        xpReward: 220,
        coinReward: 30,
        completed: false
      }
    ]
  },
  {
    id: 'npc_controller',
    name: 'Capitão Controller',
    title: 'Comandante da Fortaleza do Fluxo',
    avatar: 'controller',
    regionId: 4,
    color: '#34d399',
    lore: 'Estrategista militar e maestro do Castelo dos Controladores. Ele comanda o tráfego das mensagens e impede que o caos reine entre dados e telas.',
    greeting: 'Sentido, recruta! No meu castelo, nenhuma requisição passa sem a devida coordenação.',
    dialogueShort: [
      'Bem-vindo ao Castelo dos Controladores! Eu sou o elo que mantém Model e View em perfeita sintonia.',
      'O Controller não desenha telas e não inventa dados; ele é o maestro que recebe a ordem da View, aciona o Model e envia a resposta.',
      'Cuidado com o antipadrão do "Fat Controller"! O controlador deve ser enxuto e delegar o trabalho pesado às entidades.',
      'Prove sua habilidade organizando os fluxos e receba o Cristal do Controller!'
    ],
    deepExplanation: `### O Pilar Controller: Coordenação e Fluxo de Execução

O **Controller** é o mediador supremo da arquitetura MVC.

#### Como o Controller Opera:
1. **Ponto Focal de Entrada:**
   - Em aplicações desktop/console, a View repassa o comando ao Controller. Na Web, as requisições HTTP atingem diretamente os endpoints do Controller.
2. **Delegação para o Model:**
   - O Controller recebe os parâmetros, instancia os objetos necessários e comanda os métodos de negócio do Model ou do Repositório.
3. **Alimentação da View:**
   - Ao receber os dados processados pelo Model, o Controller repassa o resultado para a View adequada e instrui sua exibição.

#### O Antipadrão "Fat Controller":
- Um controlador "gordo" comete o erro de realizar cálculos matemáticos, abrir conexões SQL com o banco de dados e validar regras profundas de domínio.
- **Solução:** "Skinny Controller, Fat Model" — mantenha o controlador leve, com foco apenas na orquestração!`,
    quests: [
      {
        id: 'quest_4_1',
        title: 'O Maestro das Camadas',
        description: 'Organize a cadeia de execução de cadastro de aluno no fluxo MVC completo.',
        regionId: 4,
        npcId: 'npc_controller',
        challengeType: 'FLOW',
        challengeId: 'flow_1',
        xpReward: 250,
        coinReward: 45,
        completed: false
      },
      {
        id: 'quest_4_2',
        title: 'Injeção de Forças',
        description: 'Complete o construtor do AlunoController com injeção de dependência.',
        regionId: 4,
        npcId: 'npc_controller',
        challengeType: 'CODE_FILL',
        challengeId: 'fill_8',
        xpReward: 200,
        coinReward: 35,
        completed: false
      },
      {
        id: 'quest_4_3',
        title: 'A Derrota do Fat Controller',
        description: 'Depure o código de um controlador que misturou SQL e lógica de negócios indevidamente.',
        regionId: 4,
        npcId: 'npc_controller',
        challengeType: 'DEBUG',
        challengeId: 'debug_5',
        xpReward: 320,
        coinReward: 55,
        completed: false
      }
    ]
  },
  {
    id: 'npc_debug',
    name: 'Doutor Debug',
    title: 'Perito Forense de Sistemas',
    avatar: 'debug',
    regionId: 5,
    color: '#fbbf24',
    lore: 'O lendário cientista que vasculha cada linha de código em busca de vazamentos de arquitetura, acoplamentos tóxicos e bugs sorrateiros.',
    greeting: 'Aha! Meu detector de anomalias arquiteturais disparou. Temos trabalho no Laboratório!',
    dialogueShort: [
      'Impressionante como você chegou até aqui! Você já possui o conhecimento teórico dos três pilares.',
      'Agora é a hora da verdade: o Laboratório Final está à sua disposição. Você deverá criar o Sistema de Cadastro de Alunos completo em Java!',
      'Utilize o editor de código, navegue entre as camadas (model, view, controller e main), valide seus requisitos e alcance a pontuação máxima!',
      'Eu estarei observando cada classe e avaliando a integridade arquitetural do seu código.'
    ],
    deepExplanation: `### O Desafio Final: Sistema de Alunos MVC em Java

Você colocará em prática tudo o que aprendeu construindo uma aplicação Java real:

#### A Estrutura do Sistema:
- \`model/Aluno.java\`: Encapsula nome e notas, com validação de dados e o método \`calcularMedia()\`.
- \`model/AlunoRepository.java\`: Gerencia a lista de alunos em memória (\`salvar\`, \`listarTodos\`, \`buscarPorNome\`).
- \`view/AlunoView.java\`: Apresenta os menus, exibe mensagens e formata a lista de alunos para o console.
- \`controller/AlunoController.java\`: Coordena as ações do usuário, acionando o repositório e alimentando a view.
- \`Main.java\`: Ponto de entrada que inicializa a aplicação, instanciando os componentes e injetando as dependências.

#### Critérios de Avaliação (100 Pontos):
- **Model:** 20 pontos
- **View:** 15 pontos
- **Controller:** 20 pontos
- **Comunicação entre camadas:** 20 pontos
- **Funcionalidades:** 15 pontos
- **Organização do código:** 10 pontos`,
    quests: [
      {
        id: 'quest_5_1',
        title: 'A Prova do Laboratório Final',
        description: 'Desenvolva o Sistema de Alunos completo no Monaco Editor e atinja nota mínima de 70 pontos na avaliação.',
        regionId: 5,
        npcId: 'npc_debug',
        challengeType: 'LAB',
        challengeId: 'lab_final_project',
        xpReward: 1000,
        coinReward: 200,
        completed: false
      }
    ]
  }
];
