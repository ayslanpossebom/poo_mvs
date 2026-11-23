import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../../../services/audio/SoundEffects';
import { StorageService } from '../../../services/persistence/StorageService';

export const SoundToggle: React.FC = () => {
  const [settings, setSettings] = useState(() => StorageService.loadSettings());

  const toggleSound = () => {
    const updated = !settings.soundEnabled;
    sound.setSoundEnabled(updated);
    const newSettings = { ...settings, soundEnabled: updated };
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
    if (updated) sound.playClick();
  };

  const toggleMusic = () => {
    const updated = !settings.musicEnabled;
    sound.setMusicEnabled(updated);
    const newSettings = { ...settings, musicEnabled: updated };
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
    if (settings.soundEnabled) sound.playClick();
  };

  return (
    <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 rounded-xl px-2 py-1 shadow-lg">
      <button
        onClick={toggleSound}
        className={`p-1.5 rounded-lg transition ${
          settings.soundEnabled 
            ? 'text-sky-400 hover:bg-sky-950/50' 
            : 'text-slate-500 hover:bg-slate-800'
        }`}
        title={settings.soundEnabled ? 'Silenciar Efeitos' : 'Ativar Efeitos'}
      >
        {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <button
        onClick={toggleMusic}
        className={`p-1.5 rounded-lg transition ${
          settings.musicEnabled 
            ? 'text-emerald-400 hover:bg-emerald-950/50' 
            : 'text-slate-500 hover:bg-slate-800'
        }`}
        title={settings.musicEnabled ? 'Desativar Música Retro' : 'Ativar Música Retro (Chiptune)'}
      >
        <Music size={18} />
      </button>
    </div>
  );
};
