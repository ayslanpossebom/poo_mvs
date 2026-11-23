import React from 'react';
import { sound } from '../../../services/audio/SoundEffects';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'model' | 'view' | 'controller' | 'gold' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      sound.playClick();
      if (onClick) onClick(e);
    }
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-bold tracking-wide rounded-lg transition-all duration-150 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none border shadow-md';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-600 hover:border-slate-500 shadow-slate-900/50',
    model: 'bg-sky-600 hover:bg-sky-500 text-white border-sky-400 hover:border-sky-300 shadow-sky-900/50 glow-model',
    view: 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400 hover:border-purple-300 shadow-purple-900/50 glow-view',
    controller: 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 hover:border-emerald-300 shadow-emerald-900/50 glow-controller',
    gold: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold border-amber-300 hover:border-yellow-200 shadow-amber-900/50 glow-gold',
    danger: 'bg-rose-700 hover:bg-rose-600 text-white border-rose-500 hover:border-rose-400 shadow-rose-950/50',
    ghost: 'bg-transparent hover:bg-slate-800/80 text-slate-300 hover:text-white border-transparent'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
