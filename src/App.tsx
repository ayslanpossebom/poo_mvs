import React, { useState } from 'react';
import { StorageService, DEFAULT_PROFILE, DEFAULT_STATS } from './services/persistence/StorageService';
import { PlayerProfile, PlayerStats } from './types';
import { HomePage } from './app/pages/Home/HomePage';
import { CharacterSelectionPage } from './app/pages/CharacterSelection/CharacterSelectionPage';
import { WorldMapPage } from './app/pages/WorldMap/WorldMapPage';
import { AchievementsPage } from './app/pages/Achievements/AchievementsPage';
import { DashboardPage } from './app/pages/Dashboard/DashboardPage';
import { FinalLabView } from './app/components/editor/FinalLabView';
import { sound } from './services/audio/SoundEffects';

type ScreenState = 'HOME' | 'CHAR_SELECT' | 'WORLD_MAP' | 'ACHIEVEMENTS' | 'DASHBOARD' | 'FINAL_LAB';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<PlayerProfile | null>(() => StorageService.loadProfile());
  const [stats, setStats] = useState<PlayerStats>(() => StorageService.loadStats());
  const [screen, setScreen] = useState<ScreenState>('HOME');
  const [previousScreen, setPreviousScreen] = useState<ScreenState>('HOME');

  const navigateTo = (newScreen: ScreenState) => {
    sound.playClick();
    setPreviousScreen(screen);
    setScreen(newScreen);
  };

  const handleCharacterConfirmed = (newProfile: PlayerProfile) => {
    setProfile(newProfile);
    StorageService.saveProfile(newProfile);
    setScreen('WORLD_MAP');
  };

  const handleProjectCompleted = (score: number) => {
    const updatedStats = { ...stats };
    updatedStats.finalProjectScore = score;
    updatedStats.xp += 1000;
    updatedStats.coins += 200;

    if (!updatedStats.completedQuests.includes('quest_5_1')) {
      updatedStats.completedQuests.push('quest_5_1');
    }

    if (score >= 85 && !updatedStats.unlockedAchievements.includes('ach_legendary_architect')) {
      updatedStats.unlockedAchievements.push('ach_legendary_architect');
    }

    if (!updatedStats.inventory.some(i => i.id === 'trophy_legend')) {
      updatedStats.inventory.push({
        id: 'trophy_legend',
        name: 'Troféu Mestre Arquiteto de CodeLand',
        description: 'Honraria máxima por dominar e implementar o MVC completo em Java.',
        type: 'BADGE',
        icon: '🏆',
        pillar: 'ARCHITECTURE',
        acquiredAt: new Date().toISOString()
      });
    }

    setStats(updatedStats);
    StorageService.saveStats(updatedStats);
    setScreen('DASHBOARD');
  };

  return (
    <div className="w-full min-h-screen bg-codeland-dark font-sans text-slate-100 overflow-hidden">
      {screen === 'HOME' && (
        <HomePage
          hasSave={profile !== null}
          onStartNewGame={() => navigateTo('CHAR_SELECT')}
          onContinueGame={() => navigateTo('WORLD_MAP')}
          onOpenAchievements={() => navigateTo('ACHIEVEMENTS')}
          onOpenDashboard={() => navigateTo('DASHBOARD')}
        />
      )}

      {screen === 'CHAR_SELECT' && (
        <CharacterSelectionPage
          onCharacterConfirmed={handleCharacterConfirmed}
          onBackToHome={() => navigateTo('HOME')}
        />
      )}

      {screen === 'WORLD_MAP' && (
        <WorldMapPage
          profile={profile || DEFAULT_PROFILE}
          stats={stats}
          onUpdateStats={setStats}
          onOpenAchievements={() => navigateTo('ACHIEVEMENTS')}
          onOpenDashboard={() => navigateTo('DASHBOARD')}
          onOpenHome={() => navigateTo('HOME')}
          onOpenFinalLab={() => navigateTo('FINAL_LAB')}
        />
      )}

      {screen === 'ACHIEVEMENTS' && (
        <AchievementsPage
          stats={stats}
          onBack={() => navigateTo(previousScreen === 'HOME' ? 'HOME' : 'WORLD_MAP')}
        />
      )}

      {screen === 'DASHBOARD' && (
        <DashboardPage
          profile={profile || DEFAULT_PROFILE}
          stats={stats}
          onBack={() => navigateTo(previousScreen === 'HOME' ? 'HOME' : 'WORLD_MAP')}
        />
      )}

      {screen === 'FINAL_LAB' && (
        <FinalLabView
          onBackToMap={() => navigateTo('WORLD_MAP')}
          onProjectCompleted={handleProjectCompleted}
        />
      )}
    </div>
  );
};
