import { goToCharacter } from "../utils";

export function useCombatActions(combatState: Ref<CombatState | null>) {
  const socketStore = useSocketStore();
  const alertStore = useAlertStore();

  function handleNoActiveCombat() {
    alertStore.setAlert({ type: "error", message: "no_active_combat" });
    goToCharacter();
  }

  function handleCombatAction(action: CombatAction) {
    if (!combatState.value)
      return handleNoActiveCombat();
    socketStore.socket?.emit("combat:action", action);
  }

  function continueCombat() {
    if (!combatState.value)
      return handleNoActiveCombat();
    socketStore.socket?.emit("combat:continue");
  }

  function goBackToCity() {
    if (!combatState.value)
      return handleNoActiveCombat();
    socketStore.socket?.emit("combat:finish");
  }

  return { handleCombatAction, continueCombat, goBackToCity };
}
