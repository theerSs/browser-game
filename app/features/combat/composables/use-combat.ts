import type { CombatErrorCode, CombatEvents, CombatState } from "~~/shared/types";
import type { Socket } from "socket.io-client";

import { CombatLocation } from "~~/shared/enums/combat-location";

import { useSocket } from "~/composables/use-socket";

export function useCombat() {
  const alertStore = useAlertStore();
  const combatState = ref<CombatState | null>(null);
  const socket: Socket<CombatEvents> = useSocket();

  socket.emit("combat:start", CombatLocation.FOREST);

  socket.on("combat:update", (state: CombatState) => {
    combatState.value = state;
  });

  socket.on("combat:closed", () => {
    goToCharacterPage();
  });

  socket.on("combat:error", (error) => {
    const criticalErrorCodes: CombatErrorCode[] = ["no_enemy", "not_found", "invalid_location"];

    if (criticalErrorCodes.includes(error.code)) {
      goToCharacterPage();
    }

    alertStore.setAlert({
      type: "error",
      message: error.message,
    });
  });

  watchEffect(() => {
    if (combatState.value?.status === "defeat") {
      goToCharacterPage();
      alertStore.setAlert({
        type: "info",
        message: "you_have_lost",
      });
    }
  });

  function goToCharacterPage() {
    navigateTo("/game/character");
  }

  function handleNoActiveCombat() {
    alertStore.setAlert({
      type: "error",
      message: "no_active_combat",
    });
    goToCharacterPage();
  }

  function handleCombatAction(action: CombatAction) {
    if (!combatState.value) {
      handleNoActiveCombat();
      return;
    }

    socket.emit("combat:action", combatState.value.id, action);
  }

  function continueCombat() {
    if (!combatState.value) {
      handleNoActiveCombat();
      return;
    }

    socket.emit("combat:continue", combatState.value.id);
  }

  function goBackToCity() {
    if (!combatState.value) {
      handleNoActiveCombat();
      return;
    }

    socket.emit("combat:finish", combatState.value.id);
  }

  return { combatState, handleCombatAction, continueCombat, goBackToCity };
}
