export function useCombatActions(combatState: Ref<CombatState | null>) {
  const socketStore = useSocketStore();
  const alertStore = useAlertStore();

  function handleNoActiveCombat() {
    alertStore.setAlert({ type: "error", message: "no_active_combat" });
    navigateTo("/game/character");
  }

  function handleCombatAction(action: CombatAction) {
    if (!combatState.value)
      return handleNoActiveCombat();
    socketStore.socket?.emit("combat:action", combatState.value.id, action);
  }

  function continueCombat() {
    if (!combatState.value)
      return handleNoActiveCombat();
    socketStore.socket?.emit("combat:continue", combatState.value.id);
  }

  function goBackToCity() {
    if (!combatState.value)
      return handleNoActiveCombat();
    socketStore.socket?.emit("combat:finish", combatState.value.id);
  }

  return { handleCombatAction, continueCombat, goBackToCity };
}
