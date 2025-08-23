import { goToCharacter } from "../utils";
import { useCombatActions } from "./use-combat-actions";
import { useCombatSocket } from "./use-combat-socket";

export function useCombat() {
  const combatState = ref<CombatState | null>(null);
  const alertStore = useAlertStore();

  useCombatSocket((state: CombatState) => {
    combatState.value = state;
  });
  const { handleCombatAction, continueCombat, goBackToCity } = useCombatActions(combatState);

  watch(() => combatState.value?.status, () => {
    if (combatState.value?.status === "defeat") {
      goToCharacter();
      alertStore.setAlert({ type: "info", message: "you_have_lost" });
    }
  });

  return { combatState, handleCombatAction, continueCombat, goBackToCity };
}
