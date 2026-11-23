import React from 'react';
import { PlayerProfile, PlayerStats, RegionInfo } from '../../../types';
import { StorageService } from '../../../services/persistence/StorageService';
import { SoundToggle } from '../common/SoundToggle';
import { 
  Backpack, 
  Trophy, 
  BarChart3, 
  Coins, 
  MapPin, 
  Compass, 
  Sparkles,
  Home
} from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';

interface TopHUDProps {
  profile: PlayerProfile;
  stats: PlayerStats;
  currentRegion: RegionInfo;
  onOpenInventory: () => void;
  onOpenAchievements: () => void;
  onOpenDashboard: () => void;
  onOpenHome: () => void;
  onFastTravel?: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  profile,
  stats,
  currentRegion,
  onOpenInventory,
  onOpenAchievements,
  onOpenDashboard,
  onOpenHome,
  onFastTravel
}) => {
  const levelInfo = StorageService.calculateLevel(stats.xp);
  const currentLevelXp = stats.xp - levelInfo.prevXp;
  const neededXp = Math.max(1, levelInfo.nextXp - levelInfo.prevXp);
  const progressPercent = Math.min(100, Math.max(0, (currentLevelXp / neededXp) * 100));

  const heroAvatarColors: Record<string, string> = {
    Ada: 'from-sky-500 to-blue-700',
    Turing: 'from-emerald-500 to-green-700',
    Linus: 'from-purple-500 to-violet-700'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-3 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Player Profile & Level */}
        <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl pointer-events-auto">
          {/* Avatar frame */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${heroAvatarColors[profile.heroClass] || 'from-sky-500 to-blue-700'} flex items-center justify-center text-white font-extrabold text-lg shadow-inner border border-white/20 flex-shrink-0`}>
            {profile.heroClass[0]}
          </div>

          {/* Info */}
          <div className="flex flex-col min-w-[140px] sm:min-w-[180px]">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-slate-100 text-sm tracking-wide truncate max-w-[120px]">
                {profile.name}
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Nvl {levelInfo.level}
              </span>
            </div>

            <span className="text-[11px] text-slate-400 truncate mb-1">
              {levelInfo.title}
            </span>

            {/* XP Bar */}
            <div className="w-full bg-slate-950/80 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[9px] text-slate-400 mt-0.5 font-mono">
              <span>{stats.xp} XP</span>
              <span>{levelInfo.nextXp} XP</span>
            </div>
          </div>
        </div>

        {/* Center: Current Region Banner */}
        <div 
          onClick={() => {
            sound.playClick();
            if (onFastTravel) onFastTravel();
          }}
          className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-4 py-2 shadow-2xl pointer-events-auto cursor-pointer hover:border-slate-500 transition group"
          title="Clique para abrir o Seletor de Regiões"
        >
          <div 
            className="w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: currentRegion.themeColor }}
          />
          <MapPin size={16} style={{ color: currentRegion.themeColor }} />
          <div className="flex flex-col items-center">
            <span className="text-xs font-black uppercase tracking-wider text-slate-100 group-hover:text-amber-400 transition">
              {currentRegion.name}
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              {currentRegion.subtitle}
            </span>
          </div>
          <Compass size={14} className="text-slate-500 group-hover:text-amber-400 transition ml-1" />
        </div>

        {/* Right: Coins & Action Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Coins Badge */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-amber-500/40 rounded-xl px-3 py-1.5 shadow-lg text-amber-400 font-bold text-sm">
            <Coins size={16} className="text-amber-400 animate-pulse" />
            <span>{stats.coins}</span>
          </div>

          {/* Mochila / Inventário */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenInventory();
            }}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-sky-400 hover:text-sky-300 shadow-lg transition active:scale-95"
            title="Inventário (Cristais e Itens)"
          >
            <Backpack size={18} />
          </button>

          {/* Conquistas */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAchievements();
            }}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-amber-400 hover:text-amber-300 shadow-lg transition active:scale-95"
            title="Conquistas e Troféus"
          >
            <Trophy size={18} />
          </button>

          {/* Painel de Desempenho */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDashboard();
            }}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-purple-400 hover:text-purple-300 shadow-lg transition active:scale-95"
            title="Painel de Aprendizagem e Métricas"
          >
            <BarChart3 size={18} />
          </button>

          {/* Som / Música */}
          <SoundToggle />

          {/* Menu Principal */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHome();
            }}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white shadow-lg transition active:scale-95"
            title="Menu Inicial"
          >
            <Home size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
