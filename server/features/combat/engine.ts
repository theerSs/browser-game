import type { CombatAction, CombatState } from "~~/shared/types";

import { ACTION_HANDLERS } from "./actions";

export function handleCombatAction(state: CombatState, action: CombatAction): boolean {
  if (!ACTION_HANDLERS[action])
    return false;

  const actionHandler = ACTION_HANDLERS[action];

  actionHandler(state);

  if (state.player.resources.health.current <= 0) {
    state.status = "defeat";
  }
  else if (state.enemy.resources.health.current <= 0) {
    state.status = "victory";
  }

  return true;
}
