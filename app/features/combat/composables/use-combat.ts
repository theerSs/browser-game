import { CombatLocation } from "~~/shared/enums/combat-location";

import { useSocket } from "~/composables/use-socket";

export function useCombat() {
  const combatState = ref<CombatState | null>(null);
  const socket = useSocket();

  function handleCombatAction(action: CombatAction) {
    if (!combatState.value) {
      throw new Error("No active combat");
    }

    switch (action) {
      case "attack":
        socket.emit("combat:attack", combatState.value.id);
        break;
      case "defend":
        break;
      case "dodge":
        break;
      case "heal":
        socket.emit("combat:heal", combatState.value.id);
        break;
      default:
        console.error(`Unknow action ${action}`);
        break;
    }
  }

  socket.emit("combat:start", CombatLocation.FOREST);

  socket.on("combat:update", (state: CombatState) => {
    combatState.value = state;
  });

  return { combatState, handleCombatAction };
}
