import type { CombatEvents } from "./combat";
import type { CharacterEvents } from "./player";

export type AppEvents = CombatEvents & CharacterEvents;
