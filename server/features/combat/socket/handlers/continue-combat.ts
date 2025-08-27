import type { Socket } from "socket.io";

import { CombatCacheService, CombatService } from "../../services";
import { emitError } from "../utils";

export function continueCombat(socket: Socket<AppEvents>, combatId: string) {
  const combat = CombatCacheService.getCombat(combatId);
  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }

  if (combat.status !== "victory") {
    return emitError(socket, "invalid_status", "continue_invalid_combat_status");
  }

  const enemyUpdated = CombatService.updateCombatEnemy(combat);
  if (!enemyUpdated) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  socket.emit("combat:update", combat);
}
