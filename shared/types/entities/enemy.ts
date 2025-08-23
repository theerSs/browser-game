import type { Character } from "../player/character";

export type EnemyCharacter = Character & {
  loot: Array<string>;
};
