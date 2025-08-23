import { CombatLocation } from "~~/shared/enums/combat-location";

import { goToCharacter } from "../utils";

export function useCombatSocket(onCombatUpdate: (state: CombatState) => void) {
  const socketStore = useSocketStore();
  const characterStore = useCharacterStore();
  const alertStore = useAlertStore();

  function removeSocketListeners() {
    if (!socketStore.socket) {
      return;
    }
    socketStore.socket.off("combat:update");
    socketStore.socket.off("combat:closed");
    socketStore.socket.off("combat:error");
  }

  function setupSocketListeners() {
    if (!socketStore.socket || !characterStore.character) {
      return;
    }

    removeSocketListeners();

    socketStore.socket.emit("combat:start", CombatLocation.FOREST, characterStore.character?.id);

    socketStore.socket.on("combat:update", onCombatUpdate);

    socketStore.socket.on("combat:closed", () => {
      goToCharacter();
    });

    socketStore.socket.on("combat:error", (error) => {
      const criticalErrorCodes: CombatErrorCode[] = ["no_enemy", "not_found", "invalid_location"];
      if (criticalErrorCodes.includes(error.code)) {
        goToCharacter();
      }
      alertStore.setAlert({ type: "error", message: error.message });
    });
  }

  watch(() => socketStore.socket, setupSocketListeners, { immediate: true });
}
