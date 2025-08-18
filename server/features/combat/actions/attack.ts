import type { CombatState } from "~~/shared/types/combat-state";

import { getValueInRange } from "~~/server/utils/get-value-in-range";

export function doAttack(state: CombatState) {
  const { player, enemy } = state;

  const playerDamage = getValueInRange(player.stats.damage[0], player.stats.damage[1]);
  const enemyDamage = getValueInRange(enemy.stats.damage[0], enemy.stats.damage[1]);

  enemy.resources.health.current = getFinalHealth(enemy.resources.health.current - playerDamage);
  player.resources.health.current = getFinalHealth(player.resources.health.current - enemyDamage);
}

function getFinalHealth(health: number) {
  return health < 0 ? 0 : health;
}
