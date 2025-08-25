import type { CombatLocation } from "~~/shared/enums";
import type { Server, Socket } from "socket.io";

import { combatAction, continueCombat, finishCombat, startCombat } from "./handlers";

export default function combatHandler(io: Server) {
  io.on("connection", (socket: Socket<AppEvents>) => {
    socket.on("combat:start", (locationId: CombatLocation, characterId: PlayerCharacter["id"]) => startCombat(socket, locationId, characterId));
    socket.on("combat:action", (combatId: string, action: CombatAction) => combatAction(socket, combatId, action));
    socket.on("combat:finish", (combatId: string) => finishCombat(socket, combatId));
    socket.on("combat:continue", (combatId: string) => continueCombat(socket, combatId));
  });
}
