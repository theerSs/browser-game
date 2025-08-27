import type { CombatLocation } from "../enums";
import type { CombatErrorCode } from "./combat-error-code";
import type { CombatAction, CombatState } from "./combat-state";
import type { PlayerCharacter } from "./player";

export type CombatEvents = {
  "combat:start": (locationId: CombatLocation, characterId: PlayerCharacter["id"]) => void;
  "combat:action": (action: CombatAction) => void;
  "combat:continue": () => void;
  "combat:finish": () => void;
  "combat:closed": () => void;
  "combat:update": (combat: CombatState) => void;
  "combat:error": (err: { code: CombatErrorCode; message: string }) => void;
};
