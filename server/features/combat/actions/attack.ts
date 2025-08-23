import type { CombatState } from "~~/shared/types";

import { CharacterUtils } from "../utils";

export function doAttack(state: CombatState) {
  const { player, enemy } = state;

  const playerDamage = CharacterUtils.getDamage(player);
  const enemyDamage = CharacterUtils.getDamage(enemy);

  CharacterUtils.applyDamage(enemy, playerDamage);
  CharacterUtils.applyDamage(player, enemyDamage);
}
