import React, { useState, useEffect, useRef } from 'react';
import { PhaserCanvas } from '../../components/world/PhaserCanvas';
import { WorldScene } from '../../../game/scenes/WorldScene';
import { gameManager } from '../../../game/GameManager';
import { TopHUD } from '../../components/hud/TopHUD';
import { TouchControls } from '../../components/hud/TouchControls';
import { InventoryModal } from '../../components/hud/InventoryModal';
import { NPCDialogModal } from '../../components/dialogs/NPCDialogModal';
import { PortalModal } from '../../components/dialogs/PortalModal';
import { QuizModal } from '../../components/challenges/QuizModal';
import { CodeFillModal } from '../../components/challenges/CodeFillModal';
import { MatchPairsModal } from '../../components/challenges/MatchPairsModal';
import { DebugModal } from '../../components/challenges/DebugModal';
import { FlowOrderModal } from '../../components/challenges/FlowOrderModal';

import { 
  PlayerProfile, 
  PlayerStats, 
  RegionInfo, 
  NPCInfo, 
  QuestInfo,
  QuizQuestion,
  CodeFillChallenge,
  MatchChallenge,
  DebugChallenge,
  FlowChallenge
} from '../../../types';
import { REGIONS_DATA } from '../../../data/regions';
import { NPCS_DATA } from '../../../data/characters';
import { QUIZ_QUESTIONS } from '../../../data/questions';
import { FILL_CODE_CHALLENGES } from '../../../data/fillCodeChallenges';
import { MATCH_CHALLENGES } from '../../../data/matchPairsChallenges';
import { DEBUG_CHALLENGES } from '../../../data/debugChallenges';
import { FLOW_CHALLENGES } from '../../../data/flowChallenges';
import { StorageService } from '../../../services/persistence/StorageService';
import { sound } from '../../../services/audio/SoundEffects';
import confetti from 'canvas-confetti';

interface WorldMapPageProps {
  profile: PlayerProfile;
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
  onOpenAchievements: () => void;
  onOpenDashboard: () => void;
  onOpenHome: () => void;
  onOpenFinalLab: () => void;
}

export const WorldMapPage: React.FC<WorldMapPageProps> = ({
  profile,
  stats,
  onUpdateStats,
  onOpenAchievements,
  onOpenDashboard,
  onOpenHome,
  onOpenFinalLab
}) => {
  const worldSceneRef = useRef<WorldScene | null>(null);
  const [currentRegionId, setCurrentRegionId] = useState<number>(1);

  // Modals state
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [activeNpc, setActiveNpc] = useState<NPCInfo | null>(null);

  // Challenge states
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion | null>(null);
  const [activeCodeFill, setActiveCodeFill] = useState<CodeFillChallenge | null>(null);
  const [activeMatch, setActiveMatch] = useState<MatchChallenge | null>(null);
  const [activeDebug, setActiveDebug] = useState<DebugChallenge | null>(null);
  const [activeFlow, setActiveFlow] = useState<FlowChallenge | null>(null);
  const [currentQuest, setCurrentQuest] = useState<QuestInfo | null>(null);

  // Synchronize region change from Phaser
  useEffect(() => {
    const handleRegionChange = (regId: number) => {
      setCurrentRegionId(regId);
    };

    const handleInteractNPC = (npcId: string) => {
      const npc = NPCS_DATA.find(n => n.id === npcId);
      if (npc) {
        setActiveNpc(npc);
      }
    };

    const handleInteractPortal = () => {
      setIsPortalModalOpen(true);
    };

    const handleInteractChest = (chestId: string) => {
      sound.playCoin();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      awardProgress(100, 50, chestId);
    };

    gameManager.on('ENTER_REGION', handleRegionChange);
    gameManager.on('INTERACT_NPC', handleInteractNPC);
    gameManager.on('INTERACT_PORTAL', handleInteractPortal);
    gameManager.on('INTERACT_CHEST', handleInteractChest);

    return () => {
      gameManager.off('ENTER_REGION', handleRegionChange);
      gameManager.off('INTERACT_NPC', handleInteractNPC);
      gameManager.off('INTERACT_PORTAL', handleInteractPortal);
      gameManager.off('INTERACT_CHEST', handleInteractChest);
    };
  }, [stats]);

  const awardProgress = (xpReward: number, coinReward: number, challengeId?: string, isSpeedBonus?: boolean) => {
    const newXp = stats.xp + xpReward;
    const newCoins = stats.coins + coinReward;
    const levelInfo = StorageService.calculateLevel(newXp);

    const completedQuests = [...stats.completedQuests];
    if (currentQuest && !completedQuests.includes(currentQuest.id)) {
      completedQuests.push(currentQuest.id);
    }

    const completedChallenges = [...stats.completedChallenges];
    if (challengeId && !completedChallenges.includes(challengeId)) {
      completedChallenges.push(challengeId);
    }

    // Check unlocks
    const unlockedAchievements = [...stats.unlockedAchievements];
    const inventory = [...stats.inventory];

    // First step achievement
    if (!unlockedAchievements.includes('ach_first_step')) {
      unlockedAchievements.push('ach_first_step');
    }

    // Speedster achievement
    if (isSpeedBonus && !unlockedAchievements.includes('ach_speedster')) {
      unlockedAchievements.push('ach_speedster');
    }

    // Bug hunter achievement (5 debugs)
    const debugCount = completedChallenges.filter(c => c.startsWith('debug')).length;
    if (debugCount >= 5 && !unlockedAchievements.includes('ach_bug_hunter')) {
      unlockedAchievements.push('ach_bug_hunter');
    }

    // Crystals rewards check
    if (completedQuests.includes('quest_2_3') && !inventory.some(i => i.id === 'crystal_model')) {
      inventory.push({
        id: 'crystal_model',
        name: 'Cristal do Model',
        description: 'Cristal obtido ao dominar o pilar Model na Floresta dos Dados.',
        type: 'CRYSTAL',
        icon: '💎',
        pillar: 'MODEL',
        acquiredAt: new Date().toISOString()
      });
      if (!unlockedAchievements.includes('ach_master_data')) {
        unlockedAchievements.push('ach_master_data');
      }
    }

    if (completedQuests.includes('quest_3_3') && !inventory.some(i => i.id === 'crystal_view')) {
      inventory.push({
        id: 'crystal_view',
        name: 'Cristal da View',
        description: 'Cristal obtido ao purificar as telas na Cidade das Interfaces.',
        type: 'CRYSTAL',
        icon: '🔮',
        pillar: 'VIEW',
        acquiredAt: new Date().toISOString()
      });
      if (!unlockedAchievements.includes('ach_artist_views')) {
        unlockedAchievements.push('ach_artist_views');
      }
    }

    if (completedQuests.includes('quest_4_3') && !inventory.some(i => i.id === 'crystal_controller')) {
      inventory.push({
        id: 'crystal_controller',
        name: 'Cristal do Controller',
        description: 'Cristal obtido ao dominar o fluxo no Castelo dos Controladores.',
        type: 'CRYSTAL',
        icon: '🟢',
        pillar: 'CONTROLLER',
        acquiredAt: new Date().toISOString()
      });
      if (!unlockedAchievements.includes('ach_supreme_controller')) {
        unlockedAchievements.push('ach_supreme_controller');
      }
    }

    // Region unlocks by level
    const unlockedRegions = [...stats.unlockedRegions];
    if (levelInfo.level >= 2 && !unlockedRegions.includes(2)) unlockedRegions.push(2);
    if (levelInfo.level >= 3 && !unlockedRegions.includes(3)) unlockedRegions.push(3);
    if (levelInfo.level >= 4 && !unlockedRegions.includes(4)) unlockedRegions.push(4);
    if (levelInfo.level >= 5 && !unlockedRegions.includes(5)) unlockedRegions.push(5);

    const updated: PlayerStats = {
      ...stats,
      xp: newXp,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      coins: newCoins,
      challengesCompleted: completedChallenges.length,
      quizzesAnswered: challengeId?.startsWith('quiz') ? stats.quizzesAnswered + 1 : stats.quizzesAnswered,
      quizzesCorrect: challengeId?.startsWith('quiz') ? stats.quizzesCorrect + 1 : stats.quizzesCorrect,
      completedQuests,
      completedChallenges,
      unlockedRegions,
      unlockedAchievements,
      inventory
    };

    onUpdateStats(updated);
    StorageService.saveStats(updated);

    if (levelInfo.level > stats.level) {
      sound.playLevelUp();
    }
  };

  const handleStartQuest = (quest: QuestInfo) => {
    setActiveNpc(null);
    setCurrentQuest(quest);

    switch (quest.challengeType) {
      case 'QUIZ': {
        const q = QUIZ_QUESTIONS.find(item => item.id === quest.challengeId) || QUIZ_QUESTIONS[0];
        setActiveQuiz(q);
        break;
      }
      case 'CODE_FILL': {
        const cf = FILL_CODE_CHALLENGES.find(item => item.id === quest.challengeId) || FILL_CODE_CHALLENGES[0];
        setActiveCodeFill(cf);
        break;
      }
      case 'MATCH': {
        const mc = MATCH_CHALLENGES.find(item => item.id === quest.challengeId) || MATCH_CHALLENGES[0];
        setActiveMatch(mc);
        break;
      }
      case 'DEBUG': {
        const dbg = DEBUG_CHALLENGES.find(item => item.id === quest.challengeId) || DEBUG_CHALLENGES[0];
        setActiveDebug(dbg);
        break;
      }
      case 'FLOW': {
        const fl = FLOW_CHALLENGES.find(item => item.id === quest.challengeId) || FLOW_CHALLENGES[0];
        setActiveFlow(fl);
        break;
      }
      case 'LAB': {
        onOpenFinalLab();
        break;
      }
    }
  };

  const currentRegion = REGIONS_DATA.find(r => r.id === currentRegionId) || REGIONS_DATA[0];

  const handleTeleport = (regId: number) => {
    if (worldSceneRef.current) {
      worldSceneRef.current.teleportToRegion(regId);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-codeland-dark">
      {/* 1. Phaser 3 Viewport Canvas */}
      <PhaserCanvas 
        onSceneReady={(scene) => {
          worldSceneRef.current = scene;
        }} 
      />

      {/* 2. Top HUD Overlay */}
      <TopHUD
        profile={profile}
        stats={stats}
        currentRegion={currentRegion}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenAchievements={onOpenAchievements}
        onOpenDashboard={onOpenDashboard}
        onOpenHome={onOpenHome}
        onFastTravel={() => setIsPortalModalOpen(true)}
      />

      {/* 3. Touch Virtual Controls */}
      <TouchControls />

      {/* 4. Interactive Modals */}
      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        stats={stats}
      />

      <NPCDialogModal
        isOpen={activeNpc !== null}
        onClose={() => setActiveNpc(null)}
        npc={activeNpc}
        completedQuests={stats.completedQuests}
        onStartQuest={handleStartQuest}
      />

      <PortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        regions={REGIONS_DATA}
        stats={stats}
        currentRegionId={currentRegionId}
        onTeleport={handleTeleport}
      />

      {/* 5. Challenge Modals */}
      <QuizModal
        isOpen={activeQuiz !== null}
        onClose={() => setActiveQuiz(null)}
        question={activeQuiz}
        onSuccess={(xp, coins, isSpeed) => {
          awardProgress(xp, coins, activeQuiz?.id, isSpeed);
        }}
      />

      <CodeFillModal
        isOpen={activeCodeFill !== null}
        onClose={() => setActiveCodeFill(null)}
        challenge={activeCodeFill}
        onSuccess={(xp, coins) => {
          awardProgress(xp, coins, activeCodeFill?.id);
        }}
      />

      <MatchPairsModal
        isOpen={activeMatch !== null}
        onClose={() => setActiveMatch(null)}
        challenge={activeMatch}
        onSuccess={(xp, coins) => {
          awardProgress(xp, coins, activeMatch?.id);
        }}
      />

      <DebugModal
        isOpen={activeDebug !== null}
        onClose={() => setActiveDebug(null)}
        challenge={activeDebug}
        onSuccess={(xp, coins) => {
          awardProgress(xp, coins, activeDebug?.id);
        }}
      />

      <FlowOrderModal
        isOpen={activeFlow !== null}
        onClose={() => setActiveFlow(null)}
        challenge={activeFlow}
        onSuccess={(xp, coins) => {
          awardProgress(xp, coins, activeFlow?.id);
        }}
      />
    </div>
  );
};
