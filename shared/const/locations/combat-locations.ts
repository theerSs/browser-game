import type { Location } from "~~/shared/types";

import { CombatLocation } from "~~/shared/enums/combat-location";
import { Enemy } from "~~/shared/enums/enemy";

export const COMBAT_LOCATIONS: Record<CombatLocation, Location> = {
  [CombatLocation.FOREST]: {
    enemies: [Enemy.BAT, Enemy.GOBLIN, Enemy.SKELETON],
  },
} as const;
