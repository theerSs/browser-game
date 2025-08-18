import type { CombatState } from "~~/shared/types/combat-state";

export function doHeal(state: CombatState) {
  const { player } = state;
  const potion = player.inventory.find(({ id }) => id === "potion");
  if (!potion || potion.amount === 0) {
    return;
  }

  const healAmount = Math.floor(player.resources.health.current * 0.2);
  const hpAfterHeal = player.resources.health.current + healAmount;

  if (hpAfterHeal > player.resources.health.max) {
    player.resources.health.current = player.resources.health.max;
  }
  else {
    player.resources.health.current = hpAfterHeal;
  }

  potion.amount--;
}
