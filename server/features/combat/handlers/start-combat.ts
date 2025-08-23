import type { CombatLocation } from "~~/shared/enums";
import type { AppEvents } from "~~/shared/types";
import type { PlayerCharacter } from "~~/shared/types/player";
import type { Server, Socket } from "socket.io";

import db from "~~/server/configs/db";
import { COMBAT_LOCATIONS } from "~~/shared/const";

import { createCombatCache, emitError, getLocationEnemy } from "../utils";

export async function startCombat(socket: Socket<AppEvents>, io: Server, locationId: CombatLocation, characterId: PlayerCharacter["id"]) {
  if (!COMBAT_LOCATIONS[locationId]) {
    return emitError(socket, "invalid_location", "invalid_combat_location");
  }

  const enemy = getLocationEnemy(locationId);
  if (!enemy) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  const player = await db.query.character.findFirst({
    where: (fields, { eq }) => eq(fields.id, characterId),
  });

  if (!player) {
    return emitError(socket, "no_player", "no_player_found");
  }

  const combat = createCombatCache(enemy, locationId, player);
  if (!combat) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  socket.join(combat.id);
  io.to(combat.id).emit("combat:update", combat);
}
