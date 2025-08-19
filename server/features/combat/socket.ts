import type { CombatLocation } from "~~/shared/enums/combat-location";
import type { CombatEvents, EnemyCharacter } from "~~/shared/types";
import type { CombatAction, CombatState } from "~~/shared/types/combat-state";
import type { Server, Socket } from "socket.io";

import { COMBAT_LOCATIONS, PLAYER } from "~~/shared/const";
import { getEnemy } from "~~/shared/const/characters/enemies";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { COMBAT_CACHE } from "./const/cache";
import { handleCombatAction } from "./engine";

function getLocationEnemy(locationId: CombatLocation): EnemyCharacter | null {
  const location = COMBAT_LOCATIONS[locationId];
  const enemyId = _.sample(location?.enemies ?? []);

  return enemyId ? getEnemy(enemyId) : null;
}

function createCombatCache(locationId: CombatLocation): CombatState | null {
  const combatId = uuidv4();
  const enemy = getLocationEnemy(locationId);

  if (!enemy)
    return null;

  const player = _.cloneDeep(PLAYER);

  return {
    id: combatId,
    status: "pending",
    location: locationId,
    enemy,
    player,
    log: [],
  };
}

function emitError(socket: Socket, code: string, message: string) {
  socket.emit("combat:error", { code, message });
}

export default function combatHandler(io: Server) {
  io.on("connection", (socket: Socket<CombatEvents>) => {
    socket.on("combat:start", (locationId: CombatLocation) => {
      if (!COMBAT_LOCATIONS[locationId]) {
        return emitError(socket, "invalid_location", "invalid_combat_location");
      }

      const combat = createCombatCache(locationId);
      if (!combat) {
        return emitError(socket, "no_enemy", "no_enemy_found");
      }

      COMBAT_CACHE.set(combat.id, combat);

      socket.join(combat.id);
      io.to(combat.id).emit("combat:update", combat);
    });

    socket.on("combat:action", (combatId: string, action: CombatAction) => {
      const combat = COMBAT_CACHE.get(combatId);

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

    socket.on("combat:continue", (combatId: string) => {
      const combat = COMBAT_CACHE.get(combatId);
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
