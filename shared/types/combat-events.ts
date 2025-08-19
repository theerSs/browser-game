import type { CombatLocation } from "../enums/combat-location";
import type { CombatAction, CombatState } from "./combat-state";

export type CombatEvents = {
  "combat:start": (locationId: CombatLocation) => void;
  "combat:action": (combatId: string, action: CombatAction) => void;
  "combat:continue": (combatId: string) => void;
  "combat:update": (combat: CombatState) => void;
  "combat:error": (err: { code: string; message: string }) => void;
};
