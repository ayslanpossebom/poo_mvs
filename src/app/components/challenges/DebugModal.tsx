import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { DebugChallenge } from '../../../types';
import { Bug, Lightbulb, CheckCircle2, XCircle, Code, ShieldAlert } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';
import confetti from 'canvas-confetti';

interface DebugModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: DebugChallenge | null;
  onSuccess: (xpAwarded: number, coinsAwarded: number) => void;
}

export const DebugModal: React.FC<DebugModalProps> = ({
  isOpen,
  onClose,
  challenge,
  onSuccess
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showImprovedCode, setShowImprovedCode] = useState(false);
  const [activeHintLevel, setActiveHintLevel] = useState(0);

  if (!challenge) return null;

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedIndex(idx);
    setIsSubmitted(true);

    const isCorrect = idx === challenge.correctIndex;
    if (isCorrect) {
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

  const handleReset = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
    setShowImprovedCode(false);
    setActiveHintLevel(0);
  };

  const isCorrect = selectedIndex === challenge.correctIndex;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleReset();
        onClose();
      }}
      size="lg"
      title={
        <div className="flex items-center gap-2 text-rose-400">
          <Bug size={22} />
          <span>Caçador de Bugs — {challenge.title}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        {/* Anti-pattern warning banner */}
        <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl text-rose-300 text-xs">
          <ShieldAlert size={18} className="flex-shrink-0" />
          <span>Analise o trecho Java abaixo e identifique a anomalia arquitetural que quebra o padrão MVC.</span>
        </div>

        {/* Flawed Code Snippet */}
        <div className="bg-slate-950 border border-rose-900/50 rounded-xl p-4 font-code text-xs text-rose-200 overflow-x-auto shadow-inner">
          <pre>
            <code>{challenge.codeSnippet}</code>
          </pre>
        </div>

        {/* Question Text */}
        <h4 className="text-sm font-bold text-slate-100">
          {challenge.question}
        </h4>

        {/* Options */}
        <div className="flex flex-col gap-2.5">
          {challenge.options.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';

            if (isSubmitted) {
              if (idx === challenge.correctIndex) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
              } else {
                btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => handleSelect(idx)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition transform active:scale-98 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-950/80 border border-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>
                {isSubmitted && idx === challenge.correctIndex && <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />}
                {isSubmitted && isSelected && idx !== challenge.correctIndex && <XCircle size={18} className="text-rose-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isSubmitted && (
          <div className="flex flex-col gap-3">
            <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
              isCorrect 
                ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200' 
                : 'bg-rose-950/50 border-rose-500/60 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Bug arquitetural neutralizado com sucesso! (+{challenge.xp} XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} />
                    <span>Diagnóstico impreciso. Veja a análise técnica:</span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {challenge.explanation}
              </p>
            </div>

            {/* Toggle Improved Code Button */}
            <div className="flex justify-start">
              <Button
                variant="ghost"
                size="sm"
                icon={<Code size={16} />}
                onClick={() => {
                  sound.playClick();
                  setShowImprovedCode(!showImprovedCode);
                }}
                className="text-sky-400 hover:text-sky-300 text-xs"
              >
                {showImprovedCode ? 'Ocultar Código Refatorado' : 'Ver Código Refatorado (Boas Práticas)'}
              </Button>
            </div>

            {showImprovedCode && (
              <div className="bg-slate-950 border border-emerald-500/50 rounded-xl p-4 font-code text-xs text-emerald-300 overflow-x-auto shadow-inner">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-2 font-sans">
                  Implementação Arquiteturalmente Correta:
                </span>
                <pre>
                  <code>{challenge.improvedCodeSnippet}</code>
                </pre>
              </div>
            )}
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

        {/* Footer Actions */}
        {isSubmitted && (
          <div className="flex justify-end pt-2 border-t border-slate-800">
            <Button
              variant="primary"
              onClick={() => {
                handleReset();
                onClose();
              }}
            >
              Continuar
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
