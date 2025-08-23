import type { CombatState } from "~~/shared/types";

import { CharacterUtils, consumeHealthPotion } from "../utils";

export function doHeal(state: CombatState) {
  const { player } = state;
  const potion = player.inventory.potions.health;

  if (potion.amount === 0) {
    return;
  }

  const healAmount = Math.floor(player.resources.health.max * potion.healAmount);

  CharacterUtils.heal(player, healAmount);

  consumeHealthPotion(player);
}
