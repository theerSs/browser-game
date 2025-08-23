import type { AppEvents, CombatAction } from "~~/shared/types";
import type { Server, Socket } from "socket.io";

import { handleCombatAction } from "../engine";
import { emitError, getCachedCombat } from "../utils";

export function combatAction(socket: Socket<AppEvents>, io: Server, combatId: string, action: CombatAction) {
  const combat = getCachedCombat(combatId);

  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }
  if (combat.status !== "pending") {
    return emitError(socket, "invalid_status", "no_active_combat");
  }

  const actionSuccess = handleCombatAction(combat, action);

  if (actionSuccess) {
    io.to(combatId).emit("combat:update", combat);
  }
  else {
    emitError(socket, "no_action", "action_not_found");
  }
}
