import type { CombatState } from "~~/shared/types";

import { consumeHealthPotion, healCharacter } from "../utils";

export function doHeal(state: CombatState) {
  const { player } = state;
  const potion = player.inventory.potions.health;

  if (potion.amount === 0) {
    return;
  }

  const healAmount = Math.floor(player.resources.health.max * potion.healAmount);

  healCharacter(player, healAmount);

  consumeHealthPotion(player);
}
