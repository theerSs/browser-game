import type { PlayerCharacter } from "~~/shared/types";

export function consumeHealthPotion(player: PlayerCharacter) {
  player.inventory.potions.health.amount--;
}
