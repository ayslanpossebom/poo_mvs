import React from 'react';
import { Button } from '../../components/common/Button';
import { INITIAL_ACHIEVEMENTS } from '../../../data/achievements';
import { PlayerStats } from '../../../types';
import { Trophy, CheckCircle, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';

interface AchievementsPageProps {
  stats: PlayerStats;
  onBack: () => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({
  stats,
  onBack
}) => {
  const unlockedCount = stats.unlockedAchievements.length;
  const totalAchievements = INITIAL_ACHIEVEMENTS.length;
  const percentUnlocked = Math.round((unlockedCount / totalAchievements) * 100);

  return (
    <div className="min-h-screen w-full bg-codeland-dark p-6 flex flex-col items-center select-none text-slate-100">
      {/* Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <Button
          variant="primary"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Voltar
        </Button>

        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-amber-400" />
          <h2 className="text-lg font-bold text-slate-100">Galeria de Troféus e Conquistas</h2>
        </div>

        <div className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl font-bold">
          {unlockedCount} / {totalAchievements} ({percentUnlocked}%)
        </div>
      </div>

      {/* Progress Bar of Completion */}
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-8 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-300">Progresso Geral das Conquistas</span>
          <span className="text-amber-400 font-mono font-bold">{percentUnlocked}% Desbloqueado</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full transition-all duration-500"
            style={{ width: `${percentUnlocked}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_ACHIEVEMENTS.map(ach => {
          const isUnlocked = stats.unlockedAchievements.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-start gap-4 transition ${
                isUnlocked
                  ? 'bg-slate-900 border-amber-500/50 shadow-xl glow-gold'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="text-4xl p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex-shrink-0">
                {ach.icon}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-100">{ach.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    {isUnlocked ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle size={14} /> Concluída
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Lock size={14} /> Bloqueada
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 my-1">{ach.description}</p>
                <span className="text-[11px] text-slate-400 italic">
                  <strong>Requisito:</strong> {ach.requirement}
                </span>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles size={12} /> +{ach.xpReward} XP Recompensa
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
