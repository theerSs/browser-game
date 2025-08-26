import type { CombatState } from "~~/shared/types/combat-state";
import type { Socket } from "socket.io";

import { CharacterService } from "~~/server/services";

import { CombatCacheService, CombatService } from "../../services";
import { emitError } from "../utils";

async function handleCombatDefeat(combat: CombatState, socket: Socket<AppEvents>) {
  CombatCacheService.removeCombat(combat.id);
  const characterService = new CharacterService(socket);
  await characterService.updateCharacter(combat.player);
}

export async function combatAction(socket: Socket<AppEvents>, combatId: string, action: CombatAction) {
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
    else if (combat.status === "victory") {
      CombatService.updateRewards(combat);
    }
    socket.emit("combat:update", combat);
  }
  else {
    emitError(socket, "no_action", "action_not_found");
  }
}
