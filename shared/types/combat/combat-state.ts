import type { CombatLocation } from "../../enums/combat-location";
import type { EnemyCharacter } from "../entities/enemy";
import type { PlayerCharacter } from "../player/player";

export type CombatAction = "attack" | "defend" | "dodge" | "heal";
export type CombatStatus = "victory" | "defeat" | "pending";

export type CombatState = {
  id: string;
  status: CombatStatus;
  location: CombatLocation;
  player: PlayerCharacter;
  enemy: EnemyCharacter;
  log: string[];
};
