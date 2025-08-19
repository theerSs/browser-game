import type { CombatEvents } from "~~/shared/types";
import type { Socket } from "socket.io-client";

import { CombatLocation } from "~~/shared/enums/combat-location";

import { useSocket } from "~/composables/use-socket";

export function useCombat() {
  const combatState = ref<CombatState | null>(null);
  const socket: Socket<CombatEvents> = useSocket();

  function handleCombatAction(action: CombatAction) {
    if (!combatState.value) {
      throw new Error("no_active_combat");
    }

    socket.emit("combat:action", combatState.value.id, action);
  }

  socket.emit("combat:start", CombatLocation.FOREST);

  socket.on("combat:update", (state: CombatState) => {
    combatState.value = state;
  });

  socket.on("combat:error", (error) => {
    throw new Error(error.message);
  });

  return { combatState, handleCombatAction };
}
