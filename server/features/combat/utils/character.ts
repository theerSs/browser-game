import type { Character } from "~~/shared/types/player";

export class CharacterUtils {
  static applyDamage(target: Character, amount: number) {
    target.resources.health.current = Math.max(0, target.resources.health.current - amount);
  }

  static heal(target: Character, amount: number) {
    target.resources.health.current = Math.min(
      target.resources.health.max,
      target.resources.health.current + amount,
    );
  }
}
