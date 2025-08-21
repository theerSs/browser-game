import type { CombatErrorCode, CombatState } from "~~/shared/types";

import { CombatLocation } from "~~/shared/enums/combat-location";

export function useCombat() {
  const alertStore = useAlertStore();
  const combatState = ref<CombatState | null>(null);
  const socketStore = useSocketStore();

  watch(() => socketStore.socket, () => {
    socketStore.socket?.emit("combat:start", CombatLocation.FOREST);

    socketStore.socket?.on("combat:update", (state: CombatState) => {
      combatState.value = state;
    });

    socketStore.socket?.on("combat:closed", () => {
      goToCharacterPage();
    });

    socketStore.socket?.on("combat:error", (error) => {
      const criticalErrorCodes: CombatErrorCode[] = ["no_enemy", "not_found", "invalid_location"];

      if (criticalErrorCodes.includes(error.code)) {
        goToCharacterPage();
      }

      alertStore.setAlert({
        type: "error",
        message: error.message,
      });
    });
  }, { immediate: true });

  watch(() => combatState.value?.status, () => {
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

    socketStore.socket?.emit("combat:action", combatState.value.id, action);
  }

  function continueCombat() {
    if (!combatState.value) {
      handleNoActiveCombat();
      return;
    }

    socketStore.socket?.emit("combat:continue", combatState.value.id);
  }

  function goBackToCity() {
    if (!combatState.value) {
      handleNoActiveCombat();
      return;
    }

    socketStore.socket?.emit("combat:finish", combatState.value.id);
  }

  return { combatState, handleCombatAction, continueCombat, goBackToCity };
}
