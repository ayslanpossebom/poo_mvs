import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_first_step',
    title: 'Primeiro Passo em CodeLand',
    description: 'Iniciou sua jornada e conversou com o Professor Byte.',
    icon: '🚀',
    requirement: 'Concluir a primeira missão na Vila da Arquitetura.',
    xpReward: 100,
    unlocked: false
  },
  {
    id: 'ach_master_data',
    title: 'Mestre dos Dados',
    description: 'Dominou o pilar Model, aplicando encapsulamento e regras de negócio impecáveis.',
    icon: '💎',
    requirement: 'Conquistar o Cristal do Model na Floresta dos Dados.',
    xpReward: 250,
    unlocked: false
  },
  {
    id: 'ach_artist_views',
    title: 'Artista das Views',
    description: 'Purificou as interfaces, separando a apresentação gráfica de qualquer lógica matemática.',
    icon: '🔮',
    requirement: 'Conquistar o Cristal da View na Cidade das Interfaces.',
    xpReward: 250,
    unlocked: false
  },
  {
    id: 'ach_supreme_controller',
    title: 'Controlador Supremo',
    description: 'Orquestrou com maestria a comunicação e o fluxo entre as camadas da aplicação.',
    icon: '🟢',
    requirement: 'Conquistar o Cristal do Controller no Castelo dos Controladores.',
    xpReward: 250,
    unlocked: false
  },
  {
    id: 'ach_bug_hunter',
    title: 'Caçador de Bugs',
    description: 'Identificou e corrigiu 5 violações arquiteturais e anti-padrões em códigos Java.',
    icon: '🐛',
    requirement: 'Completar pelo menos 5 desafios da modalidade Depuração.',
    xpReward: 300,
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'ach_speedster',
    title: 'Velocista Java',
    description: 'Respondeu a uma pergunta de Quiz em menos de 10 segundos com precisão cirúrgica.',
    icon: '⚡',
    requirement: 'Acertar um Quiz com mais de 15 segundos restantes no cronômetro.',
    xpReward: 150,
    unlocked: false
  },
  {
    id: 'ach_legendary_architect',
    title: 'Arquiteto Lendário',
    description: 'Desenvolveu o Sistema de Alunos no Laboratório Final com pontuação superior a 85 pontos.',
    icon: '👑',
    requirement: 'Alcançar nota excelente no Laboratório Final.',
    xpReward: 500,
    unlocked: false
  },
  {
    id: 'ach_triad_restored',
    title: 'A Tríade Restaurada',
    description: 'Reuniu os três cristais primordiais (Model, View e Controller) em seu inventário.',
    icon: '✨',
    requirement: 'Possuir os 3 cristais simultaneamente no inventário.',
    xpReward: 400,
    unlocked: false
  }
];
