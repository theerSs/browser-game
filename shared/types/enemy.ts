import type { Character } from "./character";

export type EnemyCharacter = Character & {
  loot: Array<string>;
};
