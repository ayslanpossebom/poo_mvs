import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { CodeFillChallenge } from '../../../types';
import { Code2, Lightbulb, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';
import confetti from 'canvas-confetti';

interface CodeFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: CodeFillChallenge | null;
  onSuccess: (xpAwarded: number, coinsAwarded: number) => void;
}

export const CodeFillModal: React.FC<CodeFillModalProps> = ({
  isOpen,
  onClose,
  challenge,
  onSuccess
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeHintLevel, setActiveHintLevel] = useState(0);

  if (!challenge) return null;

  const currentChoice = selectedAnswer || customInput.trim();

  const handleValidate = () => {
    if (!currentChoice || isSubmitted) return;

    const correct = currentChoice.trim().toLowerCase() === challenge.correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      sound.playSuccess();
      confetti({
        particleCount: 60,
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
    setSelectedAnswer('');
    setCustomInput('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setActiveHintLevel(0);
  };

  // Replace {{BLANK}} in code template with interactive badge
  const codeParts = challenge.codeTemplate.split('{{BLANK}}');

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleReset();
        onClose();
      }}
      size="lg"
      title={
        <div className="flex items-center gap-2 text-sky-400">
          <Code2 size={22} />
          <span>Complete o Código Java — {challenge.title}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <p className="text-xs text-slate-300">
          {challenge.instructions}
        </p>

        {/* Java Code Snippet Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-code text-xs sm:text-sm text-slate-200 overflow-x-auto shadow-inner">
          <pre className="whitespace-pre">
            <code>
              {codeParts[0]}
              <span className={`inline-block px-2.5 py-0.5 mx-1 rounded border font-bold transition ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-rose-950 border-rose-500 text-rose-300'
                  : currentChoice
                  ? 'bg-sky-950 border-sky-400 text-sky-300'
                  : 'bg-amber-950/80 border-amber-500 text-amber-300 animate-pulse'
              }`}>
                {currentChoice || '___[LACUNA]___'}
              </span>
              {codeParts[1]}
            </code>
          </pre>
        </div>

        {/* Options to fill the blank */}
        {!isSubmitted && (
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Escolha uma das alternativas abaixo:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {challenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAnswer(opt);
                    setCustomInput('');
                  }}
                  className={`p-3 rounded-xl border font-code text-xs sm:text-sm font-semibold transition transform active:scale-98 ${
                    selectedAnswer === opt
                      ? 'bg-sky-950/90 border-sky-400 text-sky-200 glow-model'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Direct input fallback */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-400">Ou digite:</span>
              <input
                type="text"
                value={customInput}
                onChange={e => {
                  setCustomInput(e.target.value);
                  setSelectedAnswer('');
                }}
                placeholder="Escreva a resposta exata..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-code text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        )}

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
                  <span>Código preenchido com perfeição! (+{challenge.xp} XP)</span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>A resposta correta era: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300">{challenge.correctAnswer}</code></span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed text-slate-300 font-sans">
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

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
          {!isSubmitted ? (
            <Button
              variant="controller"
              disabled={!currentChoice}
              onClick={handleValidate}
            >
              Confirmar Resposta
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
