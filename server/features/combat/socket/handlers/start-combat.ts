import type { CombatLocation } from "~~/shared/enums";
import type { Socket } from "socket.io";

import { CharacterRepository } from "~~/server/repositories";
import { COMBAT_LOCATIONS } from "~~/shared/const";

import { CombatCacheService, SpawnService } from "../../services";
import { emitError } from "../utils";

function handleSocketOnStart(socket: Socket<AppEvents>, combat: CombatState) {
  socket.join(combat.id);
  socket.emit("combat:update", combat);
}

export async function startCombat(socket: Socket<AppEvents>, locationId: CombatLocation, characterId: PlayerCharacter["id"]) {
  const existingCombat = CombatCacheService.getCombatByCharacterId(characterId);
  if (existingCombat) {
    handleSocketOnStart(socket, existingCombat);
    return;
  }

  if (!COMBAT_LOCATIONS[locationId]) {
    return emitError(socket, "invalid_location", "invalid_combat_location");
  }

  const character = await CharacterRepository.getCharacterById(characterId);
  if (!character) {
    return emitError(socket, "no_player", "no_player_found");
  }

  const enemy = SpawnService.getLocationEnemy(locationId, character.level);
  if (!enemy) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  const combat = CombatCacheService.createCombat(enemy, locationId, character);
  if (!combat) {
    return emitError(socket, "no_enemy", "no_enemy_found");
  }

  handleSocketOnStart(socket, combat);
}
