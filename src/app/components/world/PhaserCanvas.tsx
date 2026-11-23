import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { BootScene } from '../../../game/scenes/BootScene';
import { WorldScene } from '../../../game/scenes/WorldScene';

interface PhaserCanvasProps {
  onSceneReady?: (scene: WorldScene) => void;
}

export const PhaserCanvas: React.FC<PhaserCanvasProps> = ({ onSceneReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Phaser 3 configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: '100%',
      height: '100%',
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true
      },
      backgroundColor: '#0a0d14',
      scene: [BootScene, WorldScene]
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Listen when WorldScene is active to pass reference
    const checkScene = setInterval(() => {
      const scene = game.scene.getScene('WorldScene') as WorldScene;
      if (scene && scene.scene.isActive()) {
        clearInterval(checkScene);
        if (onSceneReady) onSceneReady(scene);
      }
    }, 200);

    return () => {
      clearInterval(checkScene);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0 overflow-hidden cursor-crosshair select-none bg-codeland-dark"
      style={{ touchAction: 'none' }}
    />
  );
};
