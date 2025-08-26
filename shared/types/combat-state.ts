import type { CombatLocation } from "../enums";
import type { EnemyCharacter } from "./enemy";
import type { PlayerCharacter } from "./player";

export type CombatAction = "attack" | "defend" | "dodge" | "heal";
export type CombatStatus = "victory" | "defeat" | "pending";

export type CombatState = {
  id: string;
  status: CombatStatus;
  location: CombatLocation;
  player: PlayerCharacter;
  enemy: EnemyCharacter;
  rewards: Rewards;
};

export type Rewards = {
  experience: number;
  gold: number;
};
