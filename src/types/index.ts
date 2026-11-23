// Types for MVC Quest — A Jornada do Código

export type PillarType = 'MODEL' | 'VIEW' | 'CONTROLLER' | 'ARCHITECTURE';

export interface PlayerProfile {
  id: string;
  name: string;
  heroClass: 'Ada' | 'Turing' | 'Linus';
  heroAvatar: string;
  createdAt: string;
}

export interface PlayerStats {
  xp: number;
  level: number;
  levelTitle: string;
  coins: number;
  quizzesAnswered: number;
  quizzesCorrect: number;
  challengesCompleted: number;
  totalTimeSpentSeconds: number;
  modelScore: number;
  modelTotal: number;
  viewScore: number;
  viewTotal: number;
  controllerScore: number;
  controllerTotal: number;
  finalProjectScore: number;
  completedQuests: string[];
  completedChallenges: string[];
  unlockedRegions: number[]; // [1, 2, 3, 4, 5]
  unlockedAchievements: string[];
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: 'CRYSTAL' | 'BADGE' | 'COSMETIC' | 'KEY';
  icon: string;
  pillar?: PillarType;
  acquiredAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface RegionInfo {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  pillar: PillarType;
  unlocked: boolean;
  requiredLevel: number;
  npcId: string;
  rewardItem: InventoryItem;
}

export interface NPCInfo {
  id: string;
  name: string;
  title: string;
  avatar: string;
  regionId: number;
  color: string;
  lore: string;
  greeting: string;
  dialogueShort: string[];
  deepExplanation: string;
  quests: QuestInfo[];
}

export interface QuestInfo {
  id: string;
  title: string;
  description: string;
  regionId: number;
  npcId: string;
  challengeType: 'QUIZ' | 'CODE_FILL' | 'MATCH' | 'DEBUG' | 'FLOW' | 'LAB';
  challengeId: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
}

export interface HintLevel {
  level: number;
  costXp: number;
  text: string;
}

export interface QuizQuestion {
  id: string;
  phaseId: number;
  pillar: PillarType;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: HintLevel[];
  xp: number;
  timeLimitSeconds: number;
}

export interface CodeFillChallenge {
  id: string;
  phaseId: number;
  pillar: PillarType;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  title: string;
  instructions: string;
  codeTemplate: string; // contains {{BLANK}}
  options: string[]; // choices for the blank
  correctAnswer: string;
  explanation: string;
  hints: HintLevel[];
  xp: number;
}

export interface MatchPair {
  id: string;
  concept: string; // e.g. "Armazenar dados e aplicar regras de negócio"
  targetPillar: PillarType; // 'MODEL' | 'VIEW' | 'CONTROLLER'
  explanation: string;
}

export interface MatchChallenge {
  id: string;
  phaseId: number;
  title: string;
  description: string;
  pairs: MatchPair[];
  hints: HintLevel[];
  xp: number;
}

export interface DebugChallenge {
  id: string;
  phaseId: number;
  pillar: PillarType;
  title: string;
  codeSnippet: string;
  question: string;
  architecturalFlaw: string;
  options: string[];
  correctIndex: number;
  improvedCodeSnippet: string;
  explanation: string;
  hints: HintLevel[];
  xp: number;
}

export interface FlowStep {
  id: string;
  order: number;
  text: string;
  layer: 'USER' | 'VIEW' | 'CONTROLLER' | 'MODEL';
}

export interface FlowChallenge {
  id: string;
  phaseId: number;
  title: string;
  context: string;
  correctSteps: FlowStep[];
  explanation: string;
  hints: HintLevel[];
  xp: number;
}

export interface LabFile {
  name: string;
  path: string;
  layer: 'MODEL' | 'VIEW' | 'CONTROLLER' | 'MAIN';
  code: string;
  starterCode: string;
  referenceCode: string;
}

export interface LabValidationResult {
  score: number; // 0 - 100
  modelScore: number; // 0 - 20
  viewScore: number; // 0 - 15
  controllerScore: number; // 0 - 20
  communicationScore: number; // 0 - 20
  functionalityScore: number; // 0 - 15
  organizationScore: number; // 0 - 10
  passed: boolean;
  checklist: {
    id: string;
    label: string;
    satisfied: boolean;
    layer: PillarType;
    hint: string;
  }[];
  errors: string[];
  suggestions: string[];
  diagnosticReport: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number; // 0.0 - 1.0
  touchControls: boolean;
  reducedMotion: boolean;
}
