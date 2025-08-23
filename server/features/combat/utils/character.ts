import type { Character } from "~~/shared/types/player";

import _ from "lodash";

export class CharacterUtils {
  static applyDamage(target: Character, amount: number) {
    target.resources.health.current = Math.max(0, target.resources.health.current - amount);
  }

  static getDamage(character: Character): number {
    return _.random(character.stats.damage[0], character.stats.damage[1]);
  }
}
