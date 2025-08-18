import type { Character } from "./character";

export type EnemyCharacter = Omit<Character, "id"> & {
  loot: Array<string>;
};
