import type { CombatSocket } from "~~/shared/types";
import type { CombatState } from "~~/shared/types/combat-state";

import { CharacterService } from "~~/server/services";

import { CombatCacheService, CombatService } from "../../services";
import { emitError } from "../utils";

async function handleCombatDefeat(combat: CombatState, socket: CombatSocket) {
  CombatCacheService.removeCombat(combat.id);
  const characterService = new CharacterService(socket);
  await characterService.updateCharacter(combat.player);
}

export async function combatAction(socket: CombatSocket, action: CombatAction) {
  const combatId = socket.data.combatId;
  if (!combatId) {
    return emitError(socket, "not_found", "combat_not_found");
  }
  const combat = CombatCacheService.getCombat(combatId);

  if (!combat) {
    return emitError(socket, "not_found", "combat_not_found");
  }

  const originalStatus = combat.status;
  if (originalStatus !== "pending") {
    return emitError(socket, "invalid_status", "no_active_combat");
  }

  const actionSuccess = CombatService.handleAction(combat, action);

  if (actionSuccess) {
    if (combat.status === "defeat") {
      handleCombatDefeat(combat, socket);
    }
    socket.emit("combat:update", combat);
  }
  else {
    emitError(socket, "no_action", "action_not_found");
  }
}
