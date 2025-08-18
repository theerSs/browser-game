import type { CombatLocation } from "~~/shared/enums/combat-location";
import type { CombatState } from "~~/shared/types/combat-state";
import type { Server, Socket } from "socket.io";

import { COMBAT_LOCATIONS, PLAYER } from "~~/shared/const";
import { getEnemy } from "~~/shared/const/characters/enemies";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { COMBAT_CACHE, handleCombatAction } from "../features/combat";
import { getRandomItem } from "../utils/get-random-item";

export default function combatHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("combat:start", (locationId: CombatLocation) => {
      const combatId = uuidv4();
      const location = COMBAT_LOCATIONS[locationId];
      const enemyId = getRandomItem(location.enemies);
      if (!enemyId) {
        return;
      }

      const enemy = getEnemy(enemyId);

      const player = _.cloneDeep(PLAYER);

      const state: CombatState = {
        id: combatId,
        status: "pending",
        location: locationId,
        enemy,
        player,
        log: [],

      };
      COMBAT_CACHE.set(combatId, state);

      socket.join(combatId);
      io.to(combatId).emit("combat:update", state);
    });

    socket.on("combat:attack", (combatId: string) => {
      const combat = COMBAT_CACHE.get(combatId);

      if (!combat || combat.status !== "pending") {
        return;
      }

      handleCombatAction(combat, "attack");

      io.to(combatId).emit("combat:update", combat);
    });

    socket.on("combat:continue", (combatId) => {
      const combat = COMBAT_CACHE.get(combatId);

      if (!combat) {
        return;
      }

      const location = COMBAT_LOCATIONS[combat.location];
      const enemyId = getRandomItem(location.enemies);
      if (!enemyId) {
        return;
      }

      const enemy = getEnemy(enemyId);

      combat.enemy = enemy;

      io.to(combatId).emit("combat:update", combat);
    });

    socket.on("combat:heal", (combatId) => {
      const combat = COMBAT_CACHE.get(combatId);
      if (!combat) {
        return;
      }

      handleCombatAction(combat, "heal");

      io.to(combatId).emit("combat:update", combat);
    });
  });
}
