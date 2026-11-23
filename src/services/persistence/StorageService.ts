import { PlayerProfile, PlayerStats, GameSettings, LabFile } from '../../types';

const STORAGE_KEY_PREFIX = 'MVC_QUEST_v1_';
const PROFILE_KEY = `${STORAGE_KEY_PREFIX}profile`;
const STATS_KEY = `${STORAGE_KEY_PREFIX}stats`;
const SETTINGS_KEY = `${STORAGE_KEY_PREFIX}settings`;
const LAB_FILES_KEY = `${STORAGE_KEY_PREFIX}lab_files`;

export const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Aprendiz do Código', xpNeeded: 0 },
  { level: 2, title: 'Explorador Java', xpNeeded: 300 },
  { level: 3, title: 'Construtor de Model', xpNeeded: 800 },
  { level: 4, title: 'Mestre das Views', xpNeeded: 1500 },
  { level: 5, title: 'Guardião dos Controllers', xpNeeded: 2400 },
  { level: 6, title: 'Arquiteto MVC', xpNeeded: 3500 },
  { level: 7, title: 'Lenda de CodeLand', xpNeeded: 5000 },
];

export const DEFAULT_PROFILE: PlayerProfile = {
  id: 'hero_1',
  name: 'Dev Iniciante',
  heroClass: 'Ada',
  heroAvatar: 'ada',
  createdAt: new Date().toISOString(),
};

export const DEFAULT_STATS: PlayerStats = {
  xp: 0,
  level: 1,
  levelTitle: 'Aprendiz do Código',
  coins: 50,
  quizzesAnswered: 0,
  quizzesCorrect: 0,
  challengesCompleted: 0,
  totalTimeSpentSeconds: 0,
  modelScore: 0,
  modelTotal: 0,
  viewScore: 0,
  viewTotal: 0,
  controllerScore: 0,
  controllerTotal: 0,
  finalProjectScore: 0,
  completedQuests: [],
  completedChallenges: [],
  unlockedRegions: [1], // Region 1 unlocked by default
  unlockedAchievements: [],
  inventory: [
    {
      id: 'badge_starter',
      name: 'Manual de CodeLand',
      description: 'Guia introdutório para salvar o reino digital.',
      type: 'BADGE',
      icon: '📖',
      acquiredAt: new Date().toISOString()
    }
  ],
};

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: false,
  volume: 0.5,
  touchControls: false,
  reducedMotion: false,
};

export class StorageService {
  public static loadProfile(): PlayerProfile | null {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static saveProfile(profile: PlayerProfile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  }

  public static loadStats(): PlayerStats {
    try {
      const data = localStorage.getItem(STATS_KEY);
      if (data) {
        return { ...DEFAULT_STATS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Error loading stats', e);
    }
    return { ...DEFAULT_STATS };
  }

  public static saveStats(stats: PlayerStats): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving stats to localStorage', e);
    }
  }

  public static loadSettings(): GameSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
      }
    } catch {
      // fallback
    }
    return { ...DEFAULT_SETTINGS };
  }

  public static saveSettings(settings: GameSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings to localStorage', e);
    }
  }

  public static loadLabFiles(): LabFile[] | null {
    try {
      const data = localStorage.getItem(LAB_FILES_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static saveLabFiles(files: LabFile[]): void {
    try {
      localStorage.setItem(LAB_FILES_KEY, JSON.stringify(files));
    } catch (e) {
      console.error('Error saving lab files', e);
    }
  }

  public static calculateLevel(xp: number): { level: number; title: string; nextXp: number; prevXp: number } {
    let currentLevel = LEVEL_THRESHOLDS[0];
    let nextThreshold = LEVEL_THRESHOLDS[1]?.xpNeeded || 300;
    let prevXp = 0;

    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (xp >= LEVEL_THRESHOLDS[i].xpNeeded) {
        currentLevel = LEVEL_THRESHOLDS[i];
        prevXp = LEVEL_THRESHOLDS[i].xpNeeded;
        nextThreshold = LEVEL_THRESHOLDS[i + 1]?.xpNeeded || LEVEL_THRESHOLDS[i].xpNeeded + 1500;
      } else {
        break;
      }
    }

    return {
      level: currentLevel.level,
      title: currentLevel.title,
      nextXp: nextThreshold,
      prevXp
    };
  }

  public static resetProgress(): void {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(LAB_FILES_KEY);
  }

  public static exportSave(): string {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: this.loadProfile(),
      stats: this.loadStats(),
      settings: this.loadSettings(),
      labFiles: this.loadLabFiles()
    };
    return JSON.stringify(backup, null, 2);
  }

  public static importSave(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile) this.saveProfile(parsed.profile);
      if (parsed.stats) this.saveStats(parsed.stats);
      if (parsed.settings) this.saveSettings(parsed.settings);
      if (parsed.labFiles) this.saveLabFiles(parsed.labFiles);
      return true;
    } catch {
      return false;
    }
  }
}
