import type { CombatAction, CombatState } from "~~/shared/types/combat-state";

import { doAttack, doDefend, doDodge, doHeal } from "./actions";

export function handleCombatAction(state: CombatState, action: CombatAction) {
  switch (action) {
    case "attack":
      doAttack(state);
      break;
    case "defend":
      doDefend(state);
      break;
    case "dodge":
      doDodge(state);
      break;
    case "heal":
      doHeal(state);
      break;
    default:
      state.log.push("unknown_action");
      break;
  }

  if (state.player.resources.health.current <= 0) {
    state.status = "defeat";
  }

  if (state.enemy.resources.health.current <= 0) {
    state.status = "victory";
  }
}
