import type { PlayerCharacter } from "~~/shared/types/player";

export function consumeHealthPotion(player: PlayerCharacter) {
  player.inventory.potions.health.amount--;
}
