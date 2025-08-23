import type { CombatState } from "~~/shared/types";

import _ from "lodash";

import { CharacterUtils } from "../utils";

export function doAttack(state: CombatState) {
  const { player, enemy } = state;

  const playerDamage = _.random(player.stats.damage[0], player.stats.damage[1]);
  const enemyDamage = _.random(enemy.stats.damage[0], enemy.stats.damage[1]);

  CharacterUtils.applyDamage(enemy, playerDamage);
  CharacterUtils.applyDamage(player, enemyDamage);
}
