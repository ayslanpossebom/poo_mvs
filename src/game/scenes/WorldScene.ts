import Phaser from 'phaser';
import { gameManager, NearbyEntity } from '../GameManager';
import { StorageService } from '../../services/persistence/StorageService';
import { sound } from '../../services/audio/SoundEffects';

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    E: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
  };
  private obstacles!: Phaser.Physics.Arcade.StaticGroup;
  private npcsGroup!: Phaser.Physics.Arcade.StaticGroup;
  private chestsGroup!: Phaser.Physics.Arcade.StaticGroup;
  private portalsGroup!: Phaser.Physics.Arcade.StaticGroup;

  private promptIndicator!: Phaser.GameObjects.Sprite;
  private currentNearby: NearbyEntity | null = null;
  private openedChests: Set<string> = new Set();
  private lastStepSoundTime: number = 0;

  constructor() {
    super({ key: 'WorldScene' });
  }

  create() {
    // 1. World Bounds (2400 x 1800)
    const mapW = 2400;
    const mapH = 1800;
    this.physics.world.setBounds(0, 0, mapW, mapH);

    // 2. Generate Ground Tiles according to regions
    this.createMapTerrain(mapW, mapH);

    // 3. Static Obstacles Group (Trees, Servers, Walls, Crystals)
    this.obstacles = this.physics.add.staticGroup();
    this.createDecorationsAndObstacles();

    // 4. Create Portals
    this.portalsGroup = this.physics.add.staticGroup();
    this.createPortals();

    // 5. Create Interactive Chests
    this.chestsGroup = this.physics.add.staticGroup();
    this.createChests();

    // 6. Create NPCs
    this.npcsGroup = this.physics.add.staticGroup();
    this.createNPCs();

    // 7. Create Player
    const profile = StorageService.loadProfile();
    const heroKey = `hero_${(profile?.heroClass || 'Ada').toLowerCase()}`;
    // Spawn player in the central Vila da Arquitetura
    this.player = this.physics.add.sprite(1200, 1050, heroKey);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(10);
    this.player.setSize(20, 20);
    this.player.setOffset(6, 12);

    // Collisions
    this.physics.add.collider(this.player, this.obstacles);
    this.physics.add.collider(this.player, this.npcsGroup);

    // 8. Camera setup
    this.cameras.main.setBounds(0, 0, mapW, mapH);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.2);

    // 9. Controls
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = {
        W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        E: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        SPACE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      };
    }

    // 10. Proximity prompt bubble
    this.promptIndicator = this.add.sprite(0, 0, 'prompt_e');
    this.promptIndicator.setDepth(100);
    this.promptIndicator.setVisible(false);

    // Floating animation on prompt
    this.tweens.add({
      targets: this.promptIndicator,
      y: '+=4',
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private createMapTerrain(w: number, h: number) {
    const tileSize = 32;
    const cols = Math.ceil(w / tileSize);
    const rows = Math.ceil(h / tileSize);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * tileSize + 16;
        const y = r * tileSize + 16;

        let tile = 'tile_grass';

        // Paths connecting regions
        const isCenterPathX = (c >= 35 && c <= 40);
        const isCenterPathY = (r >= 26 && r <= 31);
        const isCrossroads = isCenterPathX || isCenterPathY;

        if (isCrossroads) {
          tile = 'tile_stone';
        } else if (c < 30 && r < 24) {
          // Region 2: Floresta dos Dados (North-West)
          tile = (c % 5 === 0 && r % 5 === 0) ? 'tile_water' : 'tile_grass';
        } else if (c >= 45 && r < 24) {
          // Region 3: Cidade das Interfaces (North-East)
          tile = 'tile_cyber';
        } else if (c < 30 && r >= 32) {
          // Region 4: Castelo dos Controladores (South-West)
          tile = 'tile_castle';
        } else if (c >= 45 && r >= 32) {
          // Region 5: Laboratório Final (South-East)
          tile = 'tile_lab';
        } else {
          // Region 1: Vila da Arquitetura (Center)
          tile = ((c + r) % 6 === 0) ? 'tile_stone' : 'tile_grass';
        }

        const bg = this.add.image(x, y, tile);
        bg.setDepth(0);
      }
    }
  }

  private createDecorationsAndObstacles() {
    // Floresta dos Dados trees
    for (let x = 120; x < 900; x += 96) {
      for (let y = 100; y < 700; y += 120) {
        if (Math.sin(x + y) > -0.2) {
          const tree = this.obstacles.create(x, y, 'prop_tree');
          tree.setSize(24, 20);
          tree.setOffset(12, 44);
          tree.setDepth(y);
        }
      }
    }

    // Cidade das Interfaces server racks and crystals
    for (let x = 1550; x < 2300; x += 140) {
      for (let y = 120; y < 700; y += 140) {
        if ((x + y) % 3 === 0) {
          const serv = this.obstacles.create(x, y, 'prop_server');
          serv.setSize(24, 24);
          serv.setOffset(4, 20);
          serv.setDepth(y);
        } else {
          const cry = this.obstacles.create(x, y, 'prop_crystal');
          cry.setSize(18, 18);
          cry.setOffset(7, 24);
          cry.setDepth(y);
        }
      }
    }

    // Castelo dos Controladores stone monoliths
    for (let x = 140; x < 900; x += 130) {
      for (let y = 1050; y < 1650; y += 150) {
        const mono = this.obstacles.create(x, y, 'prop_crystal');
        mono.setSize(20, 20);
        mono.setOffset(6, 24);
        mono.setDepth(y);
      }
    }

    // Laboratório Final server arrays
    for (let x = 1550; x < 2300; x += 130) {
      for (let y = 1050; y < 1650; y += 140) {
        const serv = this.obstacles.create(x, y, 'prop_server');
        serv.setSize(24, 24);
        serv.setOffset(4, 20);
        serv.setDepth(y);
      }
    }
  }

  private createPortals() {
    // Portals at region entry thresholds
    const portals = [
      { id: 'portal_reg_2', x: 800, y: 550, targetRegion: 2, name: 'Portal para Floresta dos Dados' },
      { id: 'portal_reg_3', x: 1600, y: 550, targetRegion: 3, name: 'Portal para Cidade das Interfaces' },
      { id: 'portal_reg_4', x: 800, y: 1250, targetRegion: 4, name: 'Portal para Castelo dos Controladores' },
      { id: 'portal_reg_5', x: 1600, y: 1250, targetRegion: 5, name: 'Portal para Laboratório Final' }
    ];

    portals.forEach(p => {
      const portal = this.portalsGroup.create(p.x, p.y, 'prop_portal');
      portal.setData('portalData', p);
      portal.setDepth(5);
      portal.setSize(36, 36);

      // Rotating glow effect
      this.tweens.add({
        targets: portal,
        angle: 360,
        duration: 8000,
        repeat: -1
      });
    });
  }

  private createChests() {
    const chests = [
      { id: 'chest_1', x: 1080, y: 950, coins: 40, xp: 80, name: 'Baú do Arquiteto' },
      { id: 'chest_2', x: 450, y: 350, coins: 60, xp: 120, name: 'Baú dos Dados Ocultos' },
      { id: 'chest_3', x: 1900, y: 350, coins: 60, xp: 120, name: 'Baú de Recursos Gráficos' },
      { id: 'chest_4', x: 450, y: 1400, coins: 80, xp: 150, name: 'Baú do Estrategista' },
      { id: 'chest_5', x: 1900, y: 1400, coins: 100, xp: 200, name: 'Baú da Matriz Central' }
    ];

    chests.forEach(c => {
      const chest = this.chestsGroup.create(c.x, c.y, 'prop_chest');
      chest.setData('chestData', c);
      chest.setDepth(c.y);
      chest.setSize(24, 20);
      chest.setOffset(4, 10);
    });
  }

  private createNPCs() {
    const npcs = [
      { id: 'npc_byte', x: 1200, y: 920, name: 'Professor Byte', title: 'Arquiteto Supremo' },
      { id: 'npc_modelina', x: 500, y: 450, name: 'Modelina', title: 'Guardiã do Model' },
      { id: 'npc_ladyview', x: 1850, y: 450, name: 'Lady View', title: 'Grã-Mestra das Interfaces' },
      { id: 'npc_controller', x: 500, y: 1300, name: 'Capitão Controller', title: 'Comandante do Fluxo' },
      { id: 'npc_debug', x: 1850, y: 1300, name: 'Doutor Debug', title: 'Perito Forense de Sistemas' }
    ];

    npcs.forEach(n => {
      const npcSprite = this.npcsGroup.create(n.x, n.y, n.id);
      npcSprite.setData('npcData', n);
      npcSprite.setDepth(n.y);
      npcSprite.setSize(24, 24);
      npcSprite.setOffset(4, 10);

      // Floating name label above NPC
      const label = this.add.text(n.x, n.y - 28, n.name, {
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#fbbf24',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        padding: { x: 5, y: 2 }
      });
      label.setOrigin(0.5);
      label.setDepth(n.y + 10);

      // Subtle breathing tween
      this.tweens.add({
        targets: npcSprite,
        y: '+=2',
        duration: 900,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  update(time: number) {
    if (!this.player) return;

    // Movement logic
    const speed = 210;
    let vx = 0;
    let vy = 0;

    // 1. Keyboard WASD / Arrows
    const isW = this.wasd?.W?.isDown || this.cursors?.up?.isDown;
    const isS = this.wasd?.S?.isDown || this.cursors?.down?.isDown;
    const isA = this.wasd?.A?.isDown || this.cursors?.left?.isDown;
    const isD = this.wasd?.D?.isDown || this.cursors?.right?.isDown;

    if (isA) vx -= 1;
    if (isD) vx += 1;
    if (isW) vy -= 1;
    if (isS) vy += 1;

    // 2. Virtual touch joystick vector
    const touchVec = gameManager.getVirtualJoystick();
    if (touchVec.x !== 0 || touchVec.y !== 0) {
      vx = touchVec.x;
      vy = touchVec.y;
    }

    // Normalize diagonal speed
    if (vx !== 0 && vy !== 0) {
      const len = Math.sqrt(vx * vx + vy * vy);
      vx = (vx / len);
      vy = (vy / len);
    }

    this.player.setVelocity(vx * speed, vy * speed);

    // Audio step tick
    if ((vx !== 0 || vy !== 0) && time - this.lastStepSoundTime > 320) {
      sound.playStep();
      this.lastStepSoundTime = time;
    }

    // Dynamically adjust depth for top-down perspective
    this.player.setDepth(this.player.y);

    // Check current Region based on coordinates
    this.checkCurrentRegion();

    // Check proximity to NPCs, Portals, and Chests
    this.checkInteractions();

    // Handle Interaction key (E or Space or Touch Action Button)
    const interactPressed = Phaser.Input.Keyboard.JustDown(this.wasd?.E) || 
                            Phaser.Input.Keyboard.JustDown(this.wasd?.SPACE) || 
                            gameManager.consumeInteractKey();

    if (interactPressed && this.currentNearby) {
      this.executeInteraction(this.currentNearby);
    }
  }

  private checkCurrentRegion() {
    const px = this.player.x;
    const py = this.player.y;

    let regionId = 1;
    if (px < 1000 && py < 850) {
      regionId = 2; // Floresta dos Dados
    } else if (px >= 1450 && py < 850) {
      regionId = 3; // Cidade das Interfaces
    } else if (px < 1000 && py >= 1150) {
      regionId = 4; // Castelo dos Controladores
    } else if (px >= 1450 && py >= 1150) {
      regionId = 5; // Laboratório Final
    } else {
      regionId = 1; // Vila da Arquitetura
    }

    gameManager.setCurrentRegionId(regionId);
  }

  private checkInteractions() {
    const px = this.player.x;
    const py = this.player.y;
    const interactRadius = 60;
    let foundNearby: NearbyEntity | null = null;
    let indicatorTarget = { x: 0, y: 0 };

    // 1. Check NPCs
    this.npcsGroup.children.iterate((c: any) => {
      if (!c) return null;
      const dist = Phaser.Math.Distance.Between(px, py, c.x, c.y);
      if (dist <= interactRadius) {
        const npcData = c.getData('npcData');
        foundNearby = {
          type: 'NPC',
          id: npcData.id,
          name: npcData.name,
          prompt: `Conversar com ${npcData.name}`
        };
        indicatorTarget = { x: c.x, y: c.y - 38 };
      }
      return null;
    });

    // 2. Check Portals (if no NPC found)
    if (!foundNearby) {
      this.portalsGroup.children.iterate((c: any) => {
        if (!c) return null;
        const dist = Phaser.Math.Distance.Between(px, py, c.x, c.y);
        if (dist <= interactRadius + 15) {
          const portalData = c.getData('portalData');
          foundNearby = {
            type: 'PORTAL',
            id: portalData.id,
            name: portalData.name,
            prompt: `Entrar no ${portalData.name}`
          };
          indicatorTarget = { x: c.x, y: c.y - 30 };
        }
        return null;
      });
    }

    // 3. Check Chests (if no NPC or Portal found)
    if (!foundNearby) {
      this.chestsGroup.children.iterate((c: any) => {
        if (!c) return null;
        const dist = Phaser.Math.Distance.Between(px, py, c.x, c.y);
        if (dist <= interactRadius) {
          const chestData = c.getData('chestData');
          if (!this.openedChests.has(chestData.id)) {
            foundNearby = {
              type: 'CHEST',
              id: chestData.id,
              name: chestData.name,
              prompt: `Abrir ${chestData.name}`
            };
            indicatorTarget = { x: c.x, y: c.y - 25 };
          }
        }
        return null;
      });
    }

    if (foundNearby) {
      this.currentNearby = foundNearby;
      this.promptIndicator.setPosition(indicatorTarget.x, indicatorTarget.y);
      this.promptIndicator.setVisible(true);
      gameManager.setNearbyEntity(foundNearby);
    } else {
      if (this.currentNearby) {
        this.currentNearby = null;
        this.promptIndicator.setVisible(false);
        gameManager.setNearbyEntity(null);
      }
    }
  }

  private executeInteraction(entity: NearbyEntity) {
    if (entity.type === 'NPC') {
      sound.playDialogBeep();
      gameManager.emit('INTERACT_NPC', entity.id);
    } else if (entity.type === 'PORTAL') {
      sound.playPortal();
      gameManager.emit('INTERACT_PORTAL', entity.id);
    } else if (entity.type === 'CHEST') {
      this.openedChests.add(entity.id);
      sound.playCoin();
      gameManager.emit('INTERACT_CHEST', entity.id);
      this.promptIndicator.setVisible(false);
      this.currentNearby = null;
    }
  }

  public teleportToRegion(regionId: number) {
    const coords: Record<number, { x: number; y: number }> = {
      1: { x: 1200, y: 1050 }, // Vila da Arquitetura
      2: { x: 500, y: 500 },   // Floresta dos Dados
      3: { x: 1850, y: 500 },  // Cidade das Interfaces
      4: { x: 500, y: 1350 },  // Castelo dos Controladores
      5: { x: 1850, y: 1350 }  // Laboratório Final
    };

    const target = coords[regionId] || coords[1];
    if (this.player) {
      this.player.setPosition(target.x, target.y);
      this.cameras.main.pan(target.x, target.y, 400);
      sound.playPortal();
    }
  }
}
