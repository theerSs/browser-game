import type { AppEvents, CombatAction } from "~~/shared/types";
import type { Server, Socket } from "socket.io";

import { handleCombatAction } from "../engine";
import { CombatCacheUtils, emitError } from "../utils";

export function combatAction(socket: Socket<AppEvents>, io: Server, combatId: string, action: CombatAction) {
  const combat = CombatCacheUtils.getCombat(combatId);

  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }

  const originalStatus = combat.status;
  if (originalStatus !== "pending") {
    return emitError(socket, "invalid_status", "no_active_combat");
  }

  const actionSuccess = handleCombatAction(combat, action);

  if (actionSuccess) {
    if (combat.status === "defeat") {
      CombatCacheUtils.removeCombat(combat.id);
    }
    io.to(combatId).emit("combat:update", combat);
  }
  else {
    emitError(socket, "no_action", "action_not_found");
  }
}
