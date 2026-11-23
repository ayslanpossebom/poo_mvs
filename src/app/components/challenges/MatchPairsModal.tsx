import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MatchChallenge, PillarType } from '../../../types';
import { GitCompare, Lightbulb, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';
import confetti from 'canvas-confetti';

interface MatchPairsModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: MatchChallenge | null;
  onSuccess: (xpAwarded: number, coinsAwarded: number) => void;
}

export const MatchPairsModal: React.FC<MatchPairsModalProps> = ({
  isOpen,
  onClose,
  challenge,
  onSuccess
}) => {
  const [selectedPillars, setSelectedPillars] = useState<Record<string, PillarType>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeHintLevel, setActiveHintLevel] = useState(0);

  if (!challenge) return null;

  const handleSelectPillar = (pairId: string, pillar: PillarType) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedPillars(prev => ({ ...prev, [pairId]: pillar }));
  };

  const allSelected = challenge.pairs.every(p => selectedPillars[p.id]);

  const handleValidate = () => {
    if (!allSelected || isSubmitted) return;

    setIsSubmitted(true);
    const correctCount = challenge.pairs.filter(p => selectedPillars[p.id] === p.targetPillar).length;
    const isAllCorrect = correctCount === challenge.pairs.length;

    if (isAllCorrect) {
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });

      const hintCost = challenge.hints.slice(0, activeHintLevel).reduce((acc, h) => acc + h.costXp, 0);
      const finalXp = Math.max(30, challenge.xp - hintCost);
      onSuccess(finalXp, 25);
    } else {
      sound.playError();
    }
  };

  const handleReset = () => {
    setSelectedPillars({});
    setIsSubmitted(false);
    setActiveHintLevel(0);
  };

  const correctCount = challenge.pairs.filter(p => selectedPillars[p.id] === p.targetPillar).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleReset();
        onClose();
      }}
      size="lg"
      title={
        <div className="flex items-center gap-2 text-purple-400">
          <GitCompare size={22} />
          <span>Ligue os Componentes — {challenge.title}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <p className="text-xs text-slate-300">
          {challenge.description} Associe cada responsabilidade ao pilar correspondente (Model, View ou Controller).
        </p>

        {/* Association Rows */}
        <div className="flex flex-col gap-3">
          {challenge.pairs.map(pair => {
            const currentSelection = selectedPillars[pair.id];
            const isCorrect = currentSelection === pair.targetPillar;

            return (
              <div
                key={pair.id}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50'
                      : 'bg-rose-950/40 border-rose-500/50'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-100">
                    {pair.concept}
                  </p>
                  {isSubmitted && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      {pair.explanation}
                    </p>
                  )}
                </div>

                {/* Pillar Selector Buttons */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {(['MODEL', 'VIEW', 'CONTROLLER'] as PillarType[]).map(pillar => {
                    const isPicked = currentSelection === pillar;
                    let btnColor = 'bg-slate-800 text-slate-400 border-slate-700';

                    if (isPicked) {
                      if (pillar === 'MODEL') btnColor = 'bg-sky-600 text-white border-sky-400 glow-model';
                      if (pillar === 'VIEW') btnColor = 'bg-purple-600 text-white border-purple-400 glow-view';
                      if (pillar === 'CONTROLLER') btnColor = 'bg-emerald-600 text-white border-emerald-400 glow-controller';
                    }

                    return (
                      <button
                        key={pillar}
                        disabled={isSubmitted}
                        onClick={() => handleSelectPillar(pair.id, pillar)}
                        className={`text-[11px] font-extrabold px-3 py-1.5 rounded-lg border transition transform active:scale-95 ${btnColor}`}
                      >
                        {pillar}
                      </button>
                    );
                  })}

                  {isSubmitted && (
                    <div className="ml-1">
                      {isCorrect ? (
                        <CheckCircle2 size={18} className="text-emerald-400" />
                      ) : (
                        <XCircle size={18} className="text-rose-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isSubmitted && (
          <div className={`p-4 rounded-xl border flex flex-col gap-1.5 ${
            correctCount === challenge.pairs.length
              ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/60 text-rose-200'
          }`}>
            <span className="font-bold text-sm">
              Resultado: {correctCount} de {challenge.pairs.length} corretas!
            </span>
            <p className="text-xs text-slate-300">
              {correctCount === challenge.pairs.length 
                ? 'Todas as responsabilidades foram associadas com precisão arquitetural.' 
                : 'Revise as explicações acima para entender onde cada responsabilidade deve residir.'}
            </p>
          </div>
        )}

        {/* Hints */}
        {!isSubmitted && challenge.hints && challenge.hints.length > 0 && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Lightbulb size={14} /> Sistema de Dicas
              </span>
              {activeHintLevel < challenge.hints.length && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    sound.playClick();
                    setActiveHintLevel(prev => prev + 1);
                  }}
                  className="text-amber-400 hover:text-amber-300 text-[11px]"
                >
                  Liberar Dica {activeHintLevel + 1} (-{challenge.hints[activeHintLevel].costXp} XP)
                </Button>
              )}
            </div>

            {activeHintLevel > 0 && (
              <div className="space-y-1.5 mt-1">
                {challenge.hints.slice(0, activeHintLevel).map((h, i) => (
                  <p key={i} className="text-[11px] text-slate-300 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                    <strong className="text-amber-400">Nível {h.level}:</strong> {h.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
          {!isSubmitted ? (
            <Button
              variant="controller"
              disabled={!allSelected}
              onClick={handleValidate}
            >
              Validar Associações
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                handleReset();
                onClose();
              }}
            >
              Continuar
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
