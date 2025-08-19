import type { CombatAction, CombatState } from "~~/shared/types/combat-state";

import { ACTION_HANDLERS } from "./actions";

export function handleCombatAction(state: CombatState, action: CombatAction) {
  const actionHandler = ACTION_HANDLERS[action];

  actionHandler(state);

  if (state.player.resources.health.current <= 0) {
    state.status = "defeat";
  }

  if (state.enemy.resources.health.current <= 0) {
    state.status = "victory";
  }
}
