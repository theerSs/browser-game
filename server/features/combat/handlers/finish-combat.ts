import type { AppEvents } from "~~/shared/types";
import type { Server, Socket } from "socket.io";

import { emitError, getCachedCombat, removeCombatFromCache } from "../utils";

export function finishCombat(socket: Socket<AppEvents>, io: Server, combatId: string) {
  const combat = getCachedCombat(combatId);
  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }

  removeCombatFromCache(combatId);

  io.to(combatId).emit("combat:closed", combat.player);
}
