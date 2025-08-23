import type { CombatState } from "~~/shared/types";

import _ from "lodash";

import { CharacterUtils } from "../utils";

export function doDodge(state: CombatState) {
  const { player, enemy } = state;
  const rawChance = (player.stats.dex - enemy.stats.dex) / 100;
  const clampedChance = Math.max(0.05, Math.min(1, rawChance));
  const roll = Math.random();

  if (roll >= clampedChance) {
    const enemyDamage = _.random(enemy.stats.damage[0], enemy.stats.damage[1]);
    CharacterUtils.applyDamage(player, enemyDamage);
  }
}
