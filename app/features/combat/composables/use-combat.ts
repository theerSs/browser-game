import type { CombatEvents } from "~~/shared/types";
import type { Socket } from "socket.io-client";

import { CombatLocation } from "~~/shared/enums/combat-location";

import { useSocket } from "~/composables/use-socket";

export function useCombat() {
  const alertStore = useAlertStore();
  const combatState = ref<CombatState | null>(null);
  const socket: Socket<CombatEvents> = useSocket();

  function handleCombatAction(action: CombatAction) {
    if (!combatState.value) {
      alertStore.setAlert({
        type: "error",
        message: "no_active_combat",
      });
      navigateTo("/character");
      return;
    }

    socket.emit("combat:action", combatState.value.id, action);
  }

  socket.emit("combat:start", CombatLocation.FOREST);

  socket.on("combat:update", (state: CombatState) => {
    combatState.value = state;
  });

  socket.on("combat:error", (error) => {
    alertStore.setAlert({
      type: "error",
      message: error.message,
    });
  });

  return { combatState, handleCombatAction };
}
