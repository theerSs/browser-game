import type { CombatLocation } from "~~/shared/enums";
import type { CombatState, EnemyCharacter } from "~~/shared/types";

import { PLAYER } from "~~/shared/const";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { COMBAT_CACHE } from "../const/cache";

export function createCombatCache(enemy: EnemyCharacter, locationId: CombatLocation): CombatState {
  const combatId = uuidv4();

  const player = _.cloneDeep(PLAYER);

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

export function removeCombatFromCache(combatId: string) {
  COMBAT_CACHE.delete(combatId);
}

export function getCachedCombat(combatId: string): CombatState | undefined {
  return COMBAT_CACHE.get(combatId);
}
