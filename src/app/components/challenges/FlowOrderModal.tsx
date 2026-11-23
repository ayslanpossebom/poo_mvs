import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FlowChallenge, FlowStep } from '../../../types';
import { GitPullRequest, ArrowUp, ArrowDown, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';
import confetti from 'canvas-confetti';

interface FlowOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: FlowChallenge | null;
  onSuccess: (xpAwarded: number, coinsAwarded: number) => void;
}

export const FlowOrderModal: React.FC<FlowOrderModalProps> = ({
  isOpen,
  onClose,
  challenge,
  onSuccess
}) => {
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeHintLevel, setActiveHintLevel] = useState(0);

  useEffect(() => {
    if (challenge && isOpen) {
      // Shuffle the steps initially
      const shuffled = [...challenge.correctSteps].sort(() => Math.random() - 0.5);
      setSteps(shuffled);
      setIsSubmitted(false);
      setIsCorrect(false);
      setActiveHintLevel(0);
    }
  }, [challenge, isOpen]);

  if (!challenge) return null;

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (isSubmitted) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= steps.length) return;

    sound.playClick();
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setSteps(newSteps);
  };

  const handleValidate = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    // Check if every step is at its expected order
    const correct = steps.every((s, idx) => s.order === idx + 1);
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 }
      });

      const hintCost = challenge.hints.slice(0, activeHintLevel).reduce((acc, h) => acc + h.costXp, 0);
      const finalXp = Math.max(40, challenge.xp - hintCost);
      onSuccess(finalXp, 30);
    } else {
      sound.playError();
    }
  };

  const layerColors: Record<string, string> = {
    USER: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
    VIEW: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
    CONTROLLER: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
    MODEL: 'bg-sky-950/80 text-sky-300 border-sky-500/40'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={
        <div className="flex items-center gap-2 text-emerald-400">
          <GitPullRequest size={22} />
          <span>Organize o Fluxo MVC — {challenge.title}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Contexto:</strong> {challenge.context}
          <br />
          Reordene os blocos abaixo utilizando as setas para posicionar a sequência lógica correta do fluxo.
        </p>

        {/* Steps List */}
        <div className="flex flex-col gap-2.5">
          {steps.map((step, idx) => {
            const isTargetInPlace = step.order === idx + 1;

            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                  isSubmitted
                    ? isTargetInPlace
                      ? 'bg-emerald-950/40 border-emerald-500/60'
                      : 'bg-rose-950/40 border-rose-500/60'
                    : 'bg-slate-900/80 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
                    {idx + 1}º
                  </span>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${layerColors[step.layer] || 'bg-slate-800 text-slate-400'}`}>
                    {step.layer}
                  </span>

                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    {step.text}
                  </span>
                </div>

                {/* Move buttons or status indicator */}
                {!isSubmitted ? (
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveStep(idx, 'up')}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition"
                      aria-label="Mover para cima"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      disabled={idx === steps.length - 1}
                      onClick={() => moveStep(idx, 'down')}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition"
                      aria-label="Mover para baixo"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    {isTargetInPlace ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : (
                      <span className="text-[10px] text-rose-400 font-bold">
                        (Deveria ser o {step.order}º)
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isSubmitted && (
          <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
            isCorrect 
              ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200' 
              : 'bg-rose-950/50 border-rose-500/60 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Fluxo MVC orquestrado com precisão cirúrgica! (+{challenge.xp} XP)</span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>A sequência contém inversões. Veja a explicação arquitetural:</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {challenge.explanation}
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
          {!isSubmitted ? (
            <Button
              variant="controller"
              onClick={handleValidate}
            >
              Verificar Ordenação
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={onClose}
            >
              Continuar
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
