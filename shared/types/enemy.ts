import type { Enemy } from "../enums/enemy";
import type { Character } from "./character";

export type EnemyCharacter = Omit<Character, "id"> & {
  id: Enemy;
  loot: Array<string>;
};
