import type { CombatLocation } from "~~/shared/enums";

import { COMBAT_LOCATIONS } from "~~/shared/const";
import { generateEnemy } from "~~/shared/const/characters/enemies";
import _ from "lodash";

export class SpawnService {
  static getLocationEnemy(locationId: CombatLocation, characterLevel: number): EnemyCharacter | null {
    const location = COMBAT_LOCATIONS[locationId];
    const enemyId = _.sample(location?.enemies ?? []);
    if (!enemyId)
      return null;

    const enemy = generateEnemy(enemyId, characterLevel);

    return enemy;
  }
}
