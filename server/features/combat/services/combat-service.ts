import type { CombatState } from "~~/shared/types/combat-state";

import { COMBAT_LOCATIONS } from "~~/shared/const";
import { generateEnemy } from "~~/shared/const/characters/enemies";
import _ from "lodash";

import { PlayerCharacterEntity } from "../domain";
import { ACTION_HANDLERS } from "../engine";

export class CombatService {
  static handleAction(combat: CombatState, action: CombatAction): boolean {
    const handler = ACTION_HANDLERS[action];
    if (!handler || !combat.enemy)
      return false;

    handler(combat);

    if (combat.player.resources.health.current <= 0) {
      combat.status = "defeat";
    }
    else if (combat.enemy.resources.health.current <= 0) {
      combat.status = "victory";
      this.updateRewards(combat);
      combat.enemiesFought++;

      if (combat.enemiesFought > 0 && combat.enemiesFought % 5 !== 0) {
        this.updateCombatEnemy(combat);
      }
    }

    return true;
  }

  static updateCombatEnemy(combat: CombatState): boolean {
    const location = COMBAT_LOCATIONS[combat.location];
    const enemyId = _.sample(location?.enemies ?? []);
    if (!enemyId)
      return false;
    combat.enemy = generateEnemy(enemyId, combat.player.level);
    combat.status = "pending";
    return true;
  }

  static updateRewards(combat: CombatState) {
    if (!combat.enemy) {
      return;
    }

    const { enemy, rewards } = combat;
    const [minGold, maxGold] = enemy.goldRange;

    rewards.experience += enemy.expGain;
    rewards.gold += _.random(minGold, maxGold);
  }

  static handleCombatFinish(combat: CombatState) {
    const { player, rewards } = combat;

    const playerCharacter = new PlayerCharacterEntity(player);
    if (rewards.experience > 0) {
      playerCharacter.levelUp(rewards.experience);
    }
    if (rewards.gold > 0) {
      playerCharacter.addGold(rewards.gold);
    }
  }
}
