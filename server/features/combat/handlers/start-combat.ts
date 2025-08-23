import type { CombatLocation } from "~~/shared/enums";
import type { AppEvents } from "~~/shared/types";
import type { PlayerCharacter } from "~~/shared/types/player";
import type { Server, Socket } from "socket.io";

import { CharacterRepository } from "~~/server/repositories";
import { COMBAT_LOCATIONS } from "~~/shared/const";

import { CombatCacheUtils, emitError, getLocationEnemy } from "../utils";

export async function startCombat(socket: Socket<AppEvents>, io: Server, locationId: CombatLocation, characterId: PlayerCharacter["id"]) {
  if (!COMBAT_LOCATIONS[locationId]) {
    return emitError(socket, "invalid_location", "invalid_combat_location");
  }

  const enemy = getLocationEnemy(locationId);
  if (!enemy) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  const character = await CharacterRepository.getCharacterById(characterId);

  if (!character) {
    return emitError(socket, "no_player", "no_player_found");
  }

  const combat = CombatCacheUtils.createCombat(enemy, locationId, character);
  if (!combat) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  socket.join(combat.id);
  io.to(combat.id).emit("combat:update", combat);
}
