import type { CombatLocation } from "~~/shared/enums";
import type { AppEvents } from "~~/shared/types";
import type { Server, Socket } from "socket.io";

import { COMBAT_LOCATIONS } from "~~/shared/const";

import { createCombatCache, emitError, getLocationEnemy } from "../utils";

export function startCombat(socket: Socket<AppEvents>, io: Server, locationId: CombatLocation) {
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
}
