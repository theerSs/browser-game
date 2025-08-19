import type { Character } from "~~/shared/types";

export function applyDamage(target: Character, amount: number) {
  target.resources.health.current = Math.max(0, target.resources.health.current - amount);
}

export function healCharacter(target: Character, amount: number) {
  target.resources.health.current = Math.min(
    target.resources.health.max,
    target.resources.health.current + amount,
  );
}
