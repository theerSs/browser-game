import type { Character } from "./character";

export type EnemyCharacter = Character & {
  goldRange: [number, number];
  expGain: number;
};
