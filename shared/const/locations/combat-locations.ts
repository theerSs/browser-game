import type { Location } from "~~/shared/types";

import { CombatLocation, Enemy } from "~~/shared/enums";

export const COMBAT_LOCATIONS: Record<CombatLocation, Location> = {
  [CombatLocation.FOREST]: {
    enemies: [Enemy.BAT, Enemy.GOBLIN, Enemy.SKELETON],
  },
} as const;
