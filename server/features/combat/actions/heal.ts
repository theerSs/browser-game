import type { CombatState } from "~~/shared/types/combat-state";

import { healCharacter } from "../utils";

export function doHeal(state: CombatState) {
  const { player } = state;
  const potion = player.inventory.find(({ id }) => id === "potion");
  if (!potion || potion.amount === 0) {
    return;
  }

  const healAmount = Math.floor(player.resources.health.current * 0.2);

  healCharacter(player, healAmount);

  potion.amount--;
}
