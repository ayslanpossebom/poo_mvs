import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { NPCInfo, QuestInfo } from '../../../types';
import { MessageSquare, BookOpen, Play, CheckCircle2, Award, Coins } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';

interface NPCDialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  npc: NPCInfo | null;
  completedQuests: string[];
  onStartQuest: (quest: QuestInfo) => void;
}

export const NPCDialogModal: React.FC<NPCDialogModalProps> = ({
  isOpen,
  onClose,
  npc,
  completedQuests,
  onStartQuest
}) => {
  const [showDeepTheory, setShowDeepTheory] = useState(false);

  if (!npc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowDeepTheory(false);
        onClose();
      }}
      size="lg"
      title={
        <div className="flex items-center gap-2" style={{ color: npc.color }}>
          <MessageSquare size={22} />
          <span>Conversando com {npc.name}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* NPC Profile Header */}
        <div className="flex items-start gap-4 bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
          {/* Avatar representation */}
          <div 
            className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-black shadow-lg flex-shrink-0"
            style={{ borderColor: npc.color, backgroundColor: `${npc.color}20` }}
          >
            {npc.name[0]}
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-100">{npc.name}</h3>
            <span className="text-xs font-semibold text-slate-400 mb-1">{npc.title}</span>
            <p className="text-xs text-slate-300 italic">{npc.lore}</p>
          </div>
        </div>

        {/* Short Dialogue speech bubble */}
        <div className="relative bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-inner">
          <div className="space-y-2 text-sm text-slate-200 leading-relaxed font-sans">
            {npc.dialogueShort.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Toggle Deep Pedagogical Theory Button */}
          <div className="mt-4 pt-3 border-t border-slate-700 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              icon={<BookOpen size={16} />}
              onClick={() => {
                sound.playClick();
                setShowDeepTheory(!showDeepTheory);
              }}
              className="text-sky-400 hover:text-sky-300"
            >
              {showDeepTheory ? 'Ocultar Explicação Completa' : 'Ver Explicação Completa do Especialista'}
            </Button>
          </div>
        </div>

        {/* Deep Theoretical Explanation Panel */}
        {showDeepTheory && (
          <div className="bg-slate-950/90 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 leading-relaxed max-h-72 overflow-y-auto space-y-3 prose prose-invert">
            <div className="whitespace-pre-line font-sans">
              {npc.deepExplanation}
            </div>
          </div>
        )}

        {/* Quests / Desafios Offered by NPC */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            <span>Missões e Desafios Disponíveis</span>
          </h4>

          <div className="flex flex-col gap-2.5">
            {npc.quests.map(quest => {
              const isCompleted = completedQuests.includes(quest.id);

              return (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                    isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/40 opacity-75'
                      : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 size={22} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-amber-400/80 flex items-center justify-center flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-100">{quest.title}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          {quest.challengeType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{quest.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end text-xs font-bold text-amber-400">
                      <span>+{quest.xpReward} XP</span>
                      <span className="text-[10px] text-amber-500/90 flex items-center gap-1">
                        <Coins size={10} /> +{quest.coinReward}
                      </span>
                    </div>

                    <Button
                      variant={isCompleted ? 'primary' : 'gold'}
                      size="sm"
                      icon={<Play size={14} />}
                      onClick={() => {
                        sound.playClick();
                        onStartQuest(quest);
                      }}
                    >
                      {isCompleted ? 'Refazer' : 'Iniciar'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
