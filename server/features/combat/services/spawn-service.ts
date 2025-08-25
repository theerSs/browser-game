import type { CombatLocation } from "~~/shared/enums";

import { COMBAT_LOCATIONS, getEnemy } from "~~/shared/const";
import _ from "lodash";

export class SpawnService {
  static getLocationEnemy(locationId: CombatLocation): EnemyCharacter | null {
    const location = COMBAT_LOCATIONS[locationId];
    const enemyId = _.sample(location?.enemies ?? []);
    return enemyId ? getEnemy(enemyId) : null;
  }
}
