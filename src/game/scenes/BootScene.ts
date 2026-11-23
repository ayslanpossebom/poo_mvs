import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Generate all game textures procedurally in memory using Canvas API
    this.createProceduralTiles();
    this.createProceduralCharacters();
    this.createProceduralProps();
    this.createProceduralNPCs();
  }

  create() {
    this.scene.start('WorldScene');
  }

  private createProceduralTiles() {
    // 1. Grass Tile (32x32)
    const grassCanvas = document.createElement('canvas');
    grassCanvas.width = 32;
    grassCanvas.height = 32;
    const gctx = grassCanvas.getContext('2d')!;
    gctx.fillStyle = '#1e3a24';
    gctx.fillRect(0, 0, 32, 32);
    // blade textures
    gctx.fillStyle = '#2d5a37';
    gctx.fillRect(4, 6, 2, 6);
    gctx.fillRect(18, 12, 2, 7);
    gctx.fillRect(24, 22, 3, 5);
    gctx.fillStyle = '#162e1c';
    gctx.fillRect(0, 31, 32, 1);
    gctx.fillRect(31, 0, 1, 32);
    this.textures.addCanvas('tile_grass', grassCanvas);

    // 2. Stone/Cobblestone Tile (32x32)
    const stoneCanvas = document.createElement('canvas');
    stoneCanvas.width = 32;
    stoneCanvas.height = 32;
    const sctx = stoneCanvas.getContext('2d')!;
    sctx.fillStyle = '#334155';
    sctx.fillRect(0, 0, 32, 32);
    sctx.fillStyle = '#475569';
    sctx.fillRect(2, 2, 12, 12);
    sctx.fillRect(16, 2, 14, 12);
    sctx.fillRect(2, 16, 14, 14);
    sctx.fillRect(18, 16, 12, 14);
    sctx.fillStyle = '#1e293b';
    sctx.strokeRect(1, 1, 14, 14);
    sctx.strokeRect(16, 1, 15, 14);
    sctx.strokeRect(1, 16, 15, 15);
    sctx.strokeRect(17, 16, 14, 15);
    this.textures.addCanvas('tile_stone', stoneCanvas);

    // 3. Cyber/Interface Tile (32x32) - Purple
    const cyberCanvas = document.createElement('canvas');
    cyberCanvas.width = 32;
    cyberCanvas.height = 32;
    const cctx = cyberCanvas.getContext('2d')!;
    cctx.fillStyle = '#1e1b4b';
    cctx.fillRect(0, 0, 32, 32);
    cctx.strokeStyle = '#c084fc';
    cctx.lineWidth = 1;
    cctx.strokeRect(2, 2, 28, 28);
    cctx.fillStyle = '#9333ea';
    cctx.fillRect(6, 6, 4, 4);
    cctx.fillRect(22, 6, 4, 4);
    cctx.fillRect(14, 14, 4, 4);
    this.textures.addCanvas('tile_cyber', cyberCanvas);

    // 4. Castle/Controller Stone Tile (32x32) - Dark emerald/slate
    const castleCanvas = document.createElement('canvas');
    castleCanvas.width = 32;
    castleCanvas.height = 32;
    const casCtx = castleCanvas.getContext('2d')!;
    casCtx.fillStyle = '#064e3b';
    casCtx.fillRect(0, 0, 32, 32);
    casCtx.fillStyle = '#047857';
    casCtx.fillRect(2, 2, 28, 13);
    casCtx.fillRect(2, 17, 28, 13);
    casCtx.strokeStyle = '#34d399';
    casCtx.strokeRect(4, 4, 24, 9);
    casCtx.strokeRect(4, 19, 24, 9);
    this.textures.addCanvas('tile_castle', castleCanvas);

    // 5. High-Tech Lab Tile (32x32) - Gold/Dark Blue
    const labCanvas = document.createElement('canvas');
    labCanvas.width = 32;
    labCanvas.height = 32;
    const lctx = labCanvas.getContext('2d')!;
    lctx.fillStyle = '#0f172a';
    lctx.fillRect(0, 0, 32, 32);
    lctx.strokeStyle = '#f59e0b';
    lctx.lineWidth = 1;
    lctx.strokeRect(1, 1, 30, 30);
    lctx.fillStyle = '#38bdf8';
    lctx.beginPath();
    lctx.arc(16, 16, 4, 0, Math.PI * 2);
    lctx.fill();
    this.textures.addCanvas('tile_lab', labCanvas);

    // 6. Water Tile (32x32)
    const waterCanvas = document.createElement('canvas');
    waterCanvas.width = 32;
    waterCanvas.height = 32;
    const wctx = waterCanvas.getContext('2d')!;
    wctx.fillStyle = '#0284c7';
    wctx.fillRect(0, 0, 32, 32);
    wctx.fillStyle = '#38bdf8';
    wctx.fillRect(4, 8, 8, 2);
    wctx.fillRect(18, 18, 10, 2);
    this.textures.addCanvas('tile_water', waterCanvas);
  }

  private createProceduralProps() {
    // 1. Cyber Tree (48x64)
    const treeCanvas = document.createElement('canvas');
    treeCanvas.width = 48;
    treeCanvas.height = 64;
    const tctx = treeCanvas.getContext('2d')!;
    // Trunk
    tctx.fillStyle = '#3b2f2f';
    tctx.fillRect(20, 36, 8, 28);
    // Foliage
    tctx.fillStyle = '#10b981';
    tctx.beginPath();
    tctx.arc(24, 28, 20, 0, Math.PI * 2);
    tctx.fill();
    tctx.fillStyle = '#34d399';
    tctx.beginPath();
    tctx.arc(20, 22, 14, 0, Math.PI * 2);
    tctx.fill();
    // Glowing tech nodes in the tree
    tctx.fillStyle = '#38bdf8';
    tctx.fillRect(16, 16, 4, 4);
    tctx.fillRect(28, 24, 4, 4);
    this.textures.addCanvas('prop_tree', treeCanvas);

    // 2. Crystal Pillar (32x48) - Multi-color crystals
    const crystalCanvas = document.createElement('canvas');
    crystalCanvas.width = 32;
    crystalCanvas.height = 48;
    const crctx = crystalCanvas.getContext('2d')!;
    // Base
    crctx.fillStyle = '#334155';
    crctx.fillRect(6, 36, 20, 10);
    // Crystal shard
    crctx.fillStyle = '#38bdf8';
    crctx.beginPath();
    crctx.moveTo(16, 4);
    crctx.lineTo(26, 20);
    crctx.lineTo(22, 36);
    crctx.lineTo(10, 36);
    crctx.lineTo(6, 20);
    crctx.closePath();
    crctx.fill();
    // Highlight
    crctx.fillStyle = '#bae6fd';
    crctx.beginPath();
    crctx.moveTo(16, 4);
    crctx.lineTo(20, 20);
    crctx.lineTo(16, 36);
    crctx.lineTo(13, 36);
    crctx.lineTo(10, 20);
    crctx.closePath();
    crctx.fill();
    this.textures.addCanvas('prop_crystal', crystalCanvas);

    // 3. Server Rack (32x48)
    const serverCanvas = document.createElement('canvas');
    serverCanvas.width = 32;
    serverCanvas.height = 48;
    const servCtx = serverCanvas.getContext('2d')!;
    servCtx.fillStyle = '#0f172a';
    servCtx.fillRect(2, 4, 28, 42);
    servCtx.strokeStyle = '#475569';
    servCtx.strokeRect(2, 4, 28, 42);
    // Server units
    for (let y = 8; y < 42; y += 8) {
      servCtx.fillStyle = '#1e293b';
      servCtx.fillRect(5, y, 22, 6);
      servCtx.fillStyle = (y % 16 === 8) ? '#22c55e' : '#38bdf8';
      servCtx.fillRect(23, y + 2, 2, 2);
    }
    this.textures.addCanvas('prop_server', serverCanvas);

    // 4. Portal Ring (48x48)
    const portalCanvas = document.createElement('canvas');
    portalCanvas.width = 48;
    portalCanvas.height = 48;
    const pctx = portalCanvas.getContext('2d')!;
    const grad = pctx.createRadialGradient(24, 24, 4, 24, 24, 22);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.5, '#38bdf8');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    pctx.fillStyle = grad;
    pctx.beginPath();
    pctx.arc(24, 24, 22, 0, Math.PI * 2);
    pctx.fill();
    pctx.strokeStyle = '#fbbf24';
    pctx.lineWidth = 2;
    pctx.strokeRect(8, 8, 32, 32);
    this.textures.addCanvas('prop_portal', portalCanvas);

    // 5. Interactive Chest (32x32)
    const chestCanvas = document.createElement('canvas');
    chestCanvas.width = 32;
    chestCanvas.height = 32;
    const chctx = chestCanvas.getContext('2d')!;
    chctx.fillStyle = '#b45309';
    chctx.fillRect(4, 10, 24, 18);
    chctx.fillStyle = '#d97706';
    chctx.fillRect(6, 6, 20, 8);
    chctx.strokeStyle = '#fef08a';
    chctx.lineWidth = 2;
    chctx.strokeRect(4, 10, 24, 18);
    // Keyhole
    chctx.fillStyle = '#fef08a';
    chctx.fillRect(14, 14, 4, 6);
    this.textures.addCanvas('prop_chest', chestCanvas);

    // 6. Interactive Prompt Bubble (Exclamation/E key) (24x24)
    const promptCanvas = document.createElement('canvas');
    promptCanvas.width = 24;
    promptCanvas.height = 24;
    const prctx = promptCanvas.getContext('2d')!;
    prctx.fillStyle = '#fbbf24';
    prctx.beginPath();
    prctx.arc(12, 12, 10, 0, Math.PI * 2);
    prctx.fill();
    prctx.fillStyle = '#0f172a';
    prctx.font = 'bold 12px Inter, sans-serif';
    prctx.textAlign = 'center';
    prctx.textBaseline = 'middle';
    prctx.fillText('E', 12, 12);
    this.textures.addCanvas('prompt_e', promptCanvas);
  }

  private createProceduralCharacters() {
    const heroes = ['Ada', 'Turing', 'Linus'];
    const heroColors: Record<string, { body: string; hair: string; accent: string }> = {
      Ada: { body: '#0284c7', hair: '#1e293b', accent: '#38bdf8' },
      Turing: { body: '#059669', hair: '#78350f', accent: '#34d399' },
      Linus: { body: '#7e22ce', hair: '#d97706', accent: '#c084fc' }
    };

    heroes.forEach(hero => {
      // 32x32 character sprite
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d')!;
      const col = heroColors[hero];

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(16, 29, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hair/Head
      ctx.fillStyle = col.hair;
      ctx.fillRect(10, 4, 12, 10);
      ctx.fillStyle = '#fbcfe8'; // Face skin
      ctx.fillRect(11, 8, 10, 8);
      // Eyes
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(13, 11, 2, 2);
      ctx.fillRect(17, 11, 2, 2);

      // Body / Tunic
      ctx.fillStyle = col.body;
      ctx.fillRect(9, 16, 14, 10);
      ctx.fillStyle = col.accent;
      ctx.fillRect(12, 16, 8, 4);

      // Legs / Feet
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(11, 26, 4, 5);
      ctx.fillRect(17, 26, 4, 5);

      this.textures.addCanvas(`hero_${hero.toLowerCase()}`, canvas);
    });
  }

  private createProceduralNPCs() {
    const npcs = [
      { id: 'npc_byte', body: '#0284c7', hair: '#e2e8f0', label: 'BYTE' },
      { id: 'npc_modelina', body: '#059669', hair: '#10b981', label: 'MDL' },
      { id: 'npc_ladyview', body: '#9333ea', hair: '#ec4899', label: 'VIEW' },
      { id: 'npc_controller', body: '#15803d', hair: '#f59e0b', label: 'CTRL' },
      { id: 'npc_debug', body: '#b45309', hair: '#f8fafc', label: 'DBG' }
    ];

    npcs.forEach(npc => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 38;
      const ctx = canvas.getContext('2d')!;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(16, 35, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Aura ring
      ctx.strokeStyle = npc.body;
      ctx.lineWidth = 1;
      ctx.strokeRect(4, 4, 24, 30);

      // Head & Hair
      ctx.fillStyle = npc.hair;
      ctx.fillRect(10, 6, 12, 10);
      ctx.fillStyle = '#fed7aa'; // Face skin
      ctx.fillRect(11, 10, 10, 8);
      // Eyes / Glasses
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(13, 13, 2, 2);
      ctx.fillRect(17, 13, 2, 2);

      // Robe / Body
      ctx.fillStyle = npc.body;
      ctx.fillRect(8, 18, 16, 14);

      // Feet
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(10, 32, 4, 4);
      ctx.fillRect(18, 32, 4, 4);

      this.textures.addCanvas(npc.id, canvas);
    });
  }
}
