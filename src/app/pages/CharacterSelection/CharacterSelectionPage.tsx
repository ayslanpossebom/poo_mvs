import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { PLAYABLE_HEROES, PlayableHero } from '../../../data/characters';
import { PlayerProfile } from '../../../types';
import { StorageService } from '../../../services/persistence/StorageService';
import { sound } from '../../../services/audio/SoundEffects';
import { Sparkles, ArrowRight, UserCheck, ArrowLeft } from 'lucide-react';

interface CharacterSelectionPageProps {
  onCharacterConfirmed: (profile: PlayerProfile) => void;
  onBackToHome: () => void;
}

export const CharacterSelectionPage: React.FC<CharacterSelectionPageProps> = ({
  onCharacterConfirmed,
  onBackToHome
}) => {
  const [selectedHero, setSelectedHero] = useState<PlayableHero>(PLAYABLE_HEROES[0]);
  const [playerName, setPlayerName] = useState<string>('Dev Aspirante');

  const handleConfirm = () => {
    sound.playLevelUp();
    const profile: PlayerProfile = {
      id: `hero_${Date.now()}`,
      name: playerName.trim() || 'Desenvolvedor',
      heroClass: selectedHero.id,
      heroAvatar: selectedHero.avatarKey,
      createdAt: new Date().toISOString()
    };
    StorageService.saveProfile(profile);
    onCharacterConfirmed(profile);
  };

  return (
    <div className="min-h-screen w-full bg-codeland-dark flex flex-col items-center justify-between p-6 select-none">
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            onBackToHome();
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Menu</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          Criação de Personagem • Passo 1 de 1
        </span>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col items-center my-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-game mb-2">
            ESCOLHA SEU ARQUITETO
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Selecione a personificação do seu herói em CodeLand e defina seu codinome.
          </p>
        </div>

        {/* 3 Heroes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-8">
          {PLAYABLE_HEROES.map(hero => {
            const isSelected = selectedHero.id === hero.id;

            return (
              <div
                key={hero.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedHero(hero);
                }}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center text-center cursor-pointer transition transform active:scale-98 ${
                  isSelected
                    ? 'bg-slate-900 border-sky-400 shadow-2xl glow-model'
                    : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800'
                }`}
              >
                {/* Visual Avatar Frame */}
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black mb-4 border-2 shadow-inner"
                  style={{ 
                    borderColor: hero.themeColor, 
                    backgroundColor: `${hero.themeColor}20` 
                  }}
                >
                  {hero.name[0]}
                </div>

                <h3 className="text-base font-bold text-slate-100">{hero.name}</h3>
                <span className="text-xs font-semibold text-slate-400 mb-2">{hero.title}</span>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {hero.description}
                </p>

                <div className="w-full pt-3 border-t border-slate-800 text-[11px] font-bold text-amber-400">
                  {hero.bonusTrait}
                </div>
              </div>
            );
          })}
        </div>

        {/* Player Name Input */}
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2 mb-6">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <UserCheck size={14} className="text-sky-400" />
            <span>Nome ou Apelido do Jogador:</span>
          </label>
          <input
            type="text"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            maxLength={20}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-bold focus:outline-none focus:border-sky-500 shadow-inner"
            placeholder="Digite seu nome..."
          />
        </div>

        {/* Confirm Button */}
        <Button
          variant="gold"
          size="lg"
          icon={<ArrowRight size={18} />}
          onClick={handleConfirm}
          className="w-full max-w-md"
        >
          DESPERTAR EM CODELAND
        </Button>
      </div>

      <div />
    </div>
  );
};
