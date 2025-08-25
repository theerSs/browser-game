import type { MapLocation } from "../../types";

import { CombatLocation, Enemy } from "../../enums";

export const COMBAT_LOCATIONS: Record<CombatLocation, MapLocation> = {
  [CombatLocation.FOREST]: {
    enemies: [Enemy.BAT, Enemy.GOBLIN, Enemy.SKELETON],
  },
} as const;
