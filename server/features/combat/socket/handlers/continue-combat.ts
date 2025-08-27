import type { CombatSocket } from "~~/shared/types";

import { CombatCacheService, CombatService } from "../../services";
import { emitError } from "../utils";

export function continueCombat(socket: CombatSocket) {
  const combatId = socket.data.combatId;
  if (!combatId) {
    return emitError(socket, "not_found", "combat_not_found");
  }

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
