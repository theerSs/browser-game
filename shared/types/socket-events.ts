import type { CharacterEvents } from "./character-events";
import type { CombatEvents } from "./combat-events";

export type AppEvents = CombatEvents & CharacterEvents;
