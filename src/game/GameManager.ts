// Event bus for communicating between Phaser 3 and React

type GameEventType = 
  | 'INTERACT_NPC'
  | 'INTERACT_PORTAL'
  | 'INTERACT_CHEST'
  | 'ENTER_REGION'
  | 'PLAYER_NEARBY'
  | 'PLAYER_LEFT_NEARBY';

export interface NearbyEntity {
  type: 'NPC' | 'PORTAL' | 'CHEST';
  id: string;
  name: string;
  prompt: string;
}

class GameManagerService {
  private listeners: Map<GameEventType, ((data: any) => void)[]> = new Map();
  private nearbyEntity: NearbyEntity | null = null;
  private currentRegionId: number = 1;
  private virtualJoystickVector = { x: 0, y: 0 };
  private interactKeyPressed: boolean = false;

  public on(event: GameEventType, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public off(event: GameEventType, callback: (data: any) => void) {
    if (!this.listeners.has(event)) return;
    const arr = this.listeners.get(event)!.filter(cb => cb !== callback);
    this.listeners.set(event, arr);
  }

  public emit(event: GameEventType, data?: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in game event listener for ${event}:`, e);
        }
      });
    }
  }

  public setNearbyEntity(entity: NearbyEntity | null) {
    this.nearbyEntity = entity;
    if (entity) {
      this.emit('PLAYER_NEARBY', entity);
    } else {
      this.emit('PLAYER_LEFT_NEARBY');
    }
  }

  public getNearbyEntity(): NearbyEntity | null {
    return this.nearbyEntity;
  }

  public setCurrentRegionId(id: number) {
    if (this.currentRegionId !== id) {
      this.currentRegionId = id;
      this.emit('ENTER_REGION', id);
    }
  }

  public getCurrentRegionId(): number {
    return this.currentRegionId;
  }

  public setVirtualJoystick(x: number, y: number) {
    this.virtualJoystickVector = { x, y };
  }

  public getVirtualJoystick() {
    return this.virtualJoystickVector;
  }

  public triggerInteract() {
    this.interactKeyPressed = true;
  }

  public consumeInteractKey(): boolean {
    if (this.interactKeyPressed) {
      this.interactKeyPressed = false;
      return true;
    }
    return false;
  }
}

export const gameManager = new GameManagerService();
