import type { CombatSocket } from "~~/shared/types";

import { CharacterService } from "~~/server/services";

import { CombatCacheService, CombatService } from "../../services";
import { emitError } from "../utils";

export async function finishCombat(socket: CombatSocket) {
  const combatId = socket.data.combatId;
  if (!combatId) {
    return emitError(socket, "not_found", "combat_not_found");
  }
  const combat = CombatCacheService.getCombat(combatId);
  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }

  if (combat.status !== "victory") {
    return emitError(socket, "invalid_status", "finish_invalid_combat_status");
  }

  CombatCacheService.removeCombat(combatId);
  CombatService.handleCombatFinish(combat);
  const characterService = new CharacterService(socket);
  await characterService.updateCharacter(combat.player);

  socket.emit("combat:closed");
}
