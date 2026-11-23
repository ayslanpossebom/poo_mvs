import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hand } from 'lucide-react';
import { gameManager } from '../../../game/GameManager';
import { sound } from '../../../services/audio/SoundEffects';

export const TouchControls: React.FC = () => {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);

  const handleDirectionStart = (dir: 'up' | 'down' | 'left' | 'right') => {
    setActiveDirection(dir);
    let vx = 0;
    let vy = 0;
    if (dir === 'up') vy = -1;
    if (dir === 'down') vy = 1;
    if (dir === 'left') vx = -1;
    if (dir === 'right') vx = 1;
    gameManager.setVirtualJoystick(vx, vy);
  };

  const handleDirectionEnd = () => {
    setActiveDirection(null);
    gameManager.setVirtualJoystick(0, 0);
  };

  const handleInteract = () => {
    sound.playClick();
    gameManager.triggerInteract();
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 z-40 flex items-end justify-between pointer-events-none select-none">
      {/* Virtual D-Pad */}
      <div className="relative w-36 h-36 bg-slate-900/60 backdrop-blur-md rounded-full border border-slate-700/60 p-2 shadow-2xl pointer-events-auto flex items-center justify-center">
        {/* Up */}
        <button
          onTouchStart={() => handleDirectionStart('up')}
          onTouchEnd={handleDirectionEnd}
          onMouseDown={() => handleDirectionStart('up')}
          onMouseUp={handleDirectionEnd}
          className={`absolute top-2 w-10 h-10 rounded-xl flex items-center justify-center transition ${
            activeDirection === 'up' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-800/80 text-slate-300'
          }`}
          aria-label="Cima"
        >
          <ArrowUp size={20} />
        </button>

        {/* Down */}
        <button
          onTouchStart={() => handleDirectionStart('down')}
          onTouchEnd={handleDirectionEnd}
          onMouseDown={() => handleDirectionStart('down')}
          onMouseUp={handleDirectionEnd}
          className={`absolute bottom-2 w-10 h-10 rounded-xl flex items-center justify-center transition ${
            activeDirection === 'down' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-800/80 text-slate-300'
          }`}
          aria-label="Baixo"
        >
          <ArrowDown size={20} />
        </button>

        {/* Left */}
        <button
          onTouchStart={() => handleDirectionStart('left')}
          onTouchEnd={handleDirectionEnd}
          onMouseDown={() => handleDirectionStart('left')}
          onMouseUp={handleDirectionEnd}
          className={`absolute left-2 w-10 h-10 rounded-xl flex items-center justify-center transition ${
            activeDirection === 'left' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-800/80 text-slate-300'
          }`}
          aria-label="Esquerda"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Right */}
        <button
          onTouchStart={() => handleDirectionStart('right')}
          onTouchEnd={handleDirectionEnd}
          onMouseDown={() => handleDirectionStart('right')}
          onMouseUp={handleDirectionEnd}
          className={`absolute right-2 w-10 h-10 rounded-xl flex items-center justify-center transition ${
            activeDirection === 'right' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-800/80 text-slate-300'
          }`}
          aria-label="Direita"
        >
          <ArrowRight size={20} />
        </button>

        {/* Center dot */}
        <div className="w-4 h-4 rounded-full bg-slate-700/80" />
      </div>

      {/* Action Button: Interact (E) */}
      <button
        onTouchStart={handleInteract}
        onClick={handleInteract}
        className="w-16 h-16 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-90 text-slate-950 font-black text-xl flex flex-col items-center justify-center shadow-2xl border-2 border-amber-300 pointer-events-auto transition glow-gold"
        aria-label="Interagir"
      >
        <Hand size={22} />
        <span className="text-[10px] tracking-wider mt-0.5">INTERAGIR</span>
      </button>
    </div>
  );
};
