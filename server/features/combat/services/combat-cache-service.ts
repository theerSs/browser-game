import type { CombatLocation } from "~~/shared/enums";

import { v4 as uuidv4 } from "uuid";

const COMBAT_CACHE = new Map<string, CombatState>();

export class CombatCacheService {
  static createCombat(enemy: EnemyCharacter, locationId: CombatLocation, player: PlayerCharacter): CombatState {
    const combatId = uuidv4();

    const combat: CombatState = {
      id: combatId,
      status: "pending",
      location: locationId,
      enemy,
      player,
      rewards: {
        experience: 0,
        gold: 0,
      },
    };

    COMBAT_CACHE.set(combatId, combat);

    return combat;
  }

  static removeCombat(combatId: string) {
    COMBAT_CACHE.delete(combatId);
  }

  static getCombat(combatId: string): CombatState | undefined {
    return COMBAT_CACHE.get(combatId);
  }

  static getCombatByCharacterId(characterId: PlayerCharacter["id"]): CombatState | undefined {
    for (const combat of COMBAT_CACHE.values()) {
      if (combat.player.id === characterId) {
        return combat;
      }
    }
    return undefined;
  }
}
