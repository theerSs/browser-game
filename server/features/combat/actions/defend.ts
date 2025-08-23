import type { CombatState } from "~~/shared/types";

import { CharacterUtils, PlayerCharacterUtils } from "../utils";

export function doDefend(state: CombatState) {
  const { player, enemy } = state;

  const enemyDamage = CharacterUtils.getDamage(enemy);
  const modifiedDamage = PlayerCharacterUtils.getDefenceModifiedDamage(player, enemyDamage);

  CharacterUtils.applyDamage(player, modifiedDamage);
}
