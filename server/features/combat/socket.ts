import type { CombatLocation } from "~~/shared/enums";
import type { AppEvents, CombatAction, CombatErrorCode, CombatEvents } from "~~/shared/types";
import type { Server, Socket } from "socket.io";

import { COMBAT_LOCATIONS } from "~~/shared/const";

import { handleCombatAction } from "./engine";
import { createCombatCache, getCachedCombat, getLocationEnemy, removeCombatFromCache } from "./utils";

function emitError(socket: Socket<AppEvents>, code: CombatErrorCode, message: string) {
  socket.emit("combat:error", { code, message });
}

export default function combatHandler(io: Server) {
  io.on("connection", (socket: Socket<AppEvents>) => {
    socket.on("combat:start", (locationId: CombatLocation) => {
      if (!COMBAT_LOCATIONS[locationId]) {
        return emitError(socket, "invalid_location", "invalid_combat_location");
      }

      const enemy = getLocationEnemy(locationId);
      if (!enemy) {
        return emitError(socket, "no_enemy", "no_enemy_found");
      }

      const combat = createCombatCache(enemy, locationId);

      socket.join(combat.id);
      io.to(combat.id).emit("combat:update", combat);
    });

    socket.on("combat:action", (combatId: string, action: CombatAction) => {
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
    });

    socket.on("combat:finish", (combatId: string) => {
      const combat = getCachedCombat(combatId);
      if (!combat) {
        return emitError(socket, "not_found", "combat_not_found");
      }

      removeCombatFromCache(combatId);

      io.to(combatId).emit("combat:closed", combat.player);
    });

    socket.on("combat:continue", (combatId: string) => {
      const combat = getCachedCombat(combatId);
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
    });
  });
}
