import type { CombatState } from "~~/shared/types";

import _ from "lodash";

import { CharacterUtils } from "../utils";

export function doDefend(state: CombatState) {
  const { player, enemy } = state;

  const enemyDamage = _.random(enemy.stats.damage[0], enemy.stats.damage[1]);
  const defenceModifier = Math.max(0.05, player.stats.defence / 100);
  const modifiedDamage = Math.floor(enemyDamage - (enemyDamage * defenceModifier));

  CharacterUtils.applyDamage(player, modifiedDamage);
}
