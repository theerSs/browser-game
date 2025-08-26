import type { CombatState } from "~~/shared/types/combat-state";

import _ from "lodash";

import { ACTION_HANDLERS } from "../engine";

export class CombatService {
  static handleAction(combat: CombatState, action: CombatAction): boolean {
    const handler = ACTION_HANDLERS[action];
    if (!handler)
      return false;

    handler(combat);

    if (combat.player.resources.health.current <= 0) {
      combat.status = "defeat";
    }
    else if (combat.enemy.resources.health.current <= 0) {
      combat.status = "victory";
    }

    return true;
  }

  static updateRewards(combat: CombatState) {
    const { enemy, rewards } = combat;
    const [minGold, maxGold] = enemy.goldRange;

    rewards.experience += enemy.expGain;
    rewards.gold += _.random(minGold, maxGold);
  }
}
