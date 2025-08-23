import type { CombatState } from "~~/shared/types";

import { PlayerCharacterUtils } from "../utils";

export function doHeal(state: CombatState) {
  PlayerCharacterUtils.heal(state.player);
}
