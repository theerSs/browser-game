import type { AppEvents } from "~~/shared/types";
import type { Server, Socket } from "socket.io";

import { CombatCacheUtils, emitError, getLocationEnemy } from "../utils";

export function continueCombat(socket: Socket<AppEvents>, io: Server, combatId: string) {
  const combat = CombatCacheUtils.getCombat(combatId);
  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }

  const enemy = getLocationEnemy(combat.location);
  if (!enemy) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  combat.enemy = enemy;
  combat.status = "pending";

  io.to(combatId).emit("combat:update", combat);
}
