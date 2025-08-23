import type { CombatState } from "~~/shared/types";

import { CharacterUtils, PlayerCharacterUtils } from "../utils";

export function doDodge(state: CombatState) {
  const { player, enemy } = state;
  const dodgeChance = PlayerCharacterUtils.getDodgeChance(player, enemy);
  const roll = Math.random();

  if (roll >= dodgeChance) {
    const enemyDamage = CharacterUtils.getDamage(enemy);
    CharacterUtils.applyDamage(player, enemyDamage);
  }
}
