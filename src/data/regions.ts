import { RegionInfo } from '../types';

export const REGIONS_DATA: RegionInfo[] = [
  {
    id: 1,
    name: 'Vila da Arquitetura',
    subtitle: 'O Ponto de Partida de CodeLand',
    description: 'Um refúgio tranquilo onde os princípios de modularidade e separação de responsabilidades são ensinados pelos mestres artesãos.',
    themeColor: '#38bdf8',
    pillar: 'ARCHITECTURE',
    unlocked: true,
    requiredLevel: 1,
    npcId: 'npc_byte',
    rewardItem: {
      id: 'badge_arch_initiate',
      name: 'Insígnia do Arquiteto Iniciante',
      description: 'Concedida pelo Professor Byte aos desenvolvedores que compreendem a separação de responsabilidades.',
      type: 'BADGE',
      icon: '🛡️',
      pillar: 'ARCHITECTURE',
      acquiredAt: ''
    }
  },
  {
    id: 2,
    name: 'Floresta dos Dados',
    subtitle: 'Santuário do Model & Encapsulamento',
    description: 'Um bosque ancestral alimentado por fluxos de dados puros. Árvores binárias e cristais de memória crescem em harmonia sob a tutela de Modelina.',
    themeColor: '#38bdf8',
    pillar: 'MODEL',
    unlocked: false,
    requiredLevel: 2,
    npcId: 'npc_modelina',
    rewardItem: {
      id: 'crystal_model',
      name: 'Cristal do Model',
      description: 'Um cristal azul reluzente que pulsa com dados consistentes e regras de negócio inabaláveis.',
      type: 'CRYSTAL',
      icon: '💎',
      pillar: 'MODEL',
      acquiredAt: ''
    }
  },
  {
    id: 3,
    name: 'Cidade das Interfaces',
    subtitle: 'Metrópole da View & Apresentação',
    description: 'Uma metrópole futurista com letreiros neon, painéis holográficos e janelas expressivas governada pela refinada Lady View.',
    themeColor: '#c084fc',
    pillar: 'VIEW',
    unlocked: false,
    requiredLevel: 3,
    npcId: 'npc_ladyview',
    rewardItem: {
      id: 'crystal_view',
      name: 'Cristal da View',
      description: 'Um prisma violeta cintilante capaz de renderizar qualquer visual sem misturar cálculos matemáticos.',
      type: 'CRYSTAL',
      icon: '🔮',
      pillar: 'VIEW',
      acquiredAt: ''
    }
  },
  {
    id: 4,
    name: 'Castelo dos Controladores',
    subtitle: 'Fortaleza do Controller & Coordenação',
    description: 'Uma fortaleza imponente fortificada com pontes levadiças e engrenagens de coordenação comandadas pelo Capitão Controller.',
    themeColor: '#34d399',
    pillar: 'CONTROLLER',
    unlocked: false,
    requiredLevel: 4,
    npcId: 'npc_controller',
    rewardItem: {
      id: 'crystal_controller',
      name: 'Cristal do Controller',
      description: 'Uma gema esmeralda que orquestra e harmoniza fluxos de mensagens entre todos os componentes.',
      type: 'CRYSTAL',
      icon: '🟢',
      pillar: 'CONTROLLER',
      acquiredAt: ''
    }
  },
  {
    id: 5,
    name: 'Laboratório Final',
    subtitle: 'O Santuário da Criação Java MVC',
    description: 'A sala de testes suprema de CodeLand. Equipado com compiladores conceituais e o Monaco Editor para erguer o grande Sistema de Alunos.',
    themeColor: '#fbbf24',
    pillar: 'ARCHITECTURE',
    unlocked: false,
    requiredLevel: 5,
    npcId: 'npc_debug',
    rewardItem: {
      id: 'trophy_legend',
      name: 'Troféu Mestre Arquiteto de CodeLand',
      description: 'A honraria máxima de CodeLand para os desenvolvedores que dominaram e implementaram o MVC completo em Java.',
      type: 'BADGE',
      icon: '🏆',
      pillar: 'ARCHITECTURE',
      acquiredAt: ''
    }
  }
];
