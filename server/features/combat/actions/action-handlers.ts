import type { CombatAction, CombatState } from "~~/shared/types";

import { doAttack } from "./attack";
import { doDefend } from "./defend";
import { doDodge } from "./dodge";
import { doHeal } from "./heal";

export const ACTION_HANDLERS: Record<CombatAction, (state: CombatState) => void> = {
  attack: doAttack,
  defend: doDefend,
  dodge: doDodge,
  heal: doHeal,
};
