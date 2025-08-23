import type { AppEvents } from "~~/shared/types";
import type { Server, Socket } from "socket.io";

import { CombatCacheUtils, emitError } from "../utils";

export function finishCombat(socket: Socket<AppEvents>, io: Server, combatId: string) {
  const combat = CombatCacheUtils.getCombat(combatId);
  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }

  CombatCacheUtils.removeCombat(combatId);

  io.to(combatId).emit("combat:closed", combat.player);
}
