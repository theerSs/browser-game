import type { Socket as BaseSocket } from "socket.io";

import type { CharacterEvents } from "./character-events";
import type { CombatEvents } from "./combat-events";
import type { CombatState } from "./combat-state";
import type { PlayerCharacter } from "./player";

export type CombatSocket = BaseSocket<CombatEvents, any, { combatId: CombatState["id"] }>;
export type CharacterSocket = BaseSocket<CharacterEvents, any, { characterId: PlayerCharacter["id"] }>;
