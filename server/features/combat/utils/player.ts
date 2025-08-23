import type { EnemyCharacter } from "~~/shared/types";
import type { PlayerCharacter } from "~~/shared/types/player";

export class PlayerCharacterUtils {
  static consumeHealthPotion(player: PlayerCharacter) {
    player.inventory.potions.health.amount--;
  }

  static heal(player: PlayerCharacter) {
    const potion = player.inventory.potions.health;
    if (potion.amount === 0) {
      return;
    }

    const healAmount = Math.floor(player.resources.health.max * potion.healAmount);

    player.resources.health.current = Math.min(
      player.resources.health.max,
      player.resources.health.current + healAmount,
    );
  }

  static getDodgeChance(player: PlayerCharacter, enemy: EnemyCharacter): number {
    const rawChance = (player.stats.dex - enemy.stats.dex) / 100;
    return Math.max(0.05, Math.min(1, rawChance));
  }

  static getDefenceModifiedDamage(player: PlayerCharacter, damage: number): number {
    const defenceModifier = Math.max(0.05, player.stats.defence / 100);
    return Math.floor(damage - (damage * defenceModifier));
  }
}
