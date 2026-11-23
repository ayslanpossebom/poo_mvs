import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { QuizQuestion } from '../../../types';
import { Timer, Lightbulb, CheckCircle2, XCircle, Sparkles, Award } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: QuizQuestion | null;
  onSuccess: (xpAwarded: number, coinsAwarded: number, isSpeedBonus: boolean) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  question,
  onSuccess
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [activeHintLevel, setActiveHintLevel] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen && question) {
      setSelectedIndex(null);
      setIsAnswered(false);
      setTimeLeft(question.timeLimitSeconds || 25);
      setActiveHintLevel(0);

      // Start countdown timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, question]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    sound.playError();
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !question) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedIndex(idx);
    setIsAnswered(true);

    const isCorrect = idx === question.correctIndex;

    if (isCorrect) {
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      const isSpeedBonus = timeLeft >= (question.timeLimitSeconds * 0.5);
      let awardedXp = question.xp;
      if (isSpeedBonus) awardedXp += 50;
      // Deduct hint penalties if any
      const hintCost = question.hints.slice(0, activeHintLevel).reduce((acc, h) => acc + h.costXp, 0);
      awardedXp = Math.max(25, awardedXp - hintCost);

      onSuccess(awardedXp, 20, isSpeedBonus);
    } else {
      sound.playError();
    }
  };

  if (!question) return null;

  const timerPercent = (timeLeft / question.timeLimitSeconds) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (timerRef.current) clearInterval(timerRef.current);
        onClose();
      }}
      size="lg"
      title={
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-2 text-sky-400">
            <Sparkles size={20} />
            <span>Quiz Relâmpago — {question.pillar}</span>
          </div>

          {/* Timer Indicator */}
          <div className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
            timeLeft <= 5 
              ? 'bg-rose-950/80 border-rose-500 text-rose-400 animate-pulse' 
              : 'bg-slate-950/80 border-slate-700 text-amber-400'
          }`}>
            <Timer size={14} />
            <span>{timeLeft}s</span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        {/* Progress Bar of Time */}
        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-sky-400 to-amber-400'
            }`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>

        {/* Question Text */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
            {question.question}
          </h3>
          {question.codeSnippet && (
            <pre className="mt-3 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-code text-sky-300 overflow-x-auto">
              <code>{question.codeSnippet}</code>
            </pre>
          )}
        </div>

        {/* Alternatives */}
        <div className="flex flex-col gap-2.5">
          {question.options.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrect = idx === question.correctIndex;

            let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';
            if (isAnswered) {
              if (isCorrect) {
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
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition transform active:scale-98 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-950/80 border border-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback after answering */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
            selectedIndex === question.correctIndex 
              ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200' 
              : 'bg-rose-950/50 border-rose-500/60 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedIndex === question.correctIndex ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Excelente! Resposta Correta!</span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>Não foi dessa vez. Veja a explicação pedagógica:</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Hints Section */}
        {!isAnswered && question.hints && question.hints.length > 0 && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Lightbulb size={14} /> Sistema de Dicas
              </span>
              {activeHintLevel < question.hints.length && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    sound.playClick();
                    setActiveHintLevel(prev => prev + 1);
                  }}
                  className="text-amber-400 hover:text-amber-300 text-[11px]"
                >
                  Liberar Dica {activeHintLevel + 1} (-{question.hints[activeHintLevel].costXp} XP)
                </Button>
              )}
            </div>

            {activeHintLevel > 0 && (
              <div className="space-y-1.5 mt-1">
                {question.hints.slice(0, activeHintLevel).map((h, i) => (
                  <p key={i} className="text-[11px] text-slate-300 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                    <strong className="text-amber-400">Nível {h.level}:</strong> {h.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        {isAnswered && (
          <div className="flex justify-end pt-2 border-t border-slate-800">
            <Button
              variant="primary"
              onClick={onClose}
            >
              Continuar Jornada
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
