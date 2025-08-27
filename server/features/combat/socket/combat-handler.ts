import type { CombatLocation } from "~~/shared/enums";
import type { CombatSocket } from "~~/shared/types";
import type { Server } from "socket.io";

import { combatAction, continueCombat, finishCombat, startCombat } from "./handlers";

export default function combatHandler(io: Server) {
  io.on("connection", (socket: CombatSocket) => {
    socket.on("combat:start", (locationId: CombatLocation, characterId: PlayerCharacter["id"]) => startCombat(socket, locationId, characterId));
    socket.on("combat:action", (action: CombatAction) => combatAction(socket, action));
    socket.on("combat:finish", () => finishCombat(socket));
    socket.on("combat:continue", () => continueCombat(socket));
  });
}
