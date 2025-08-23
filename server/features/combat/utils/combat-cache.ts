import type { CombatLocation } from "~~/shared/enums";
import type { CombatState, EnemyCharacter } from "~~/shared/types";
import type { PlayerCharacter } from "~~/shared/types/player";

import { v4 as uuidv4 } from "uuid";

import { COMBAT_CACHE } from "../const/cache";

export class CombatCacheUtils {
  static createCombat(enemy: EnemyCharacter, locationId: CombatLocation, player: PlayerCharacter): CombatState {
    const combatId = uuidv4();

    const combat: CombatState = {
      id: combatId,
      status: "pending",
      location: locationId,
      enemy,
      player,
      log: [],
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
}
