import type { EnemyCharacter } from "~~/shared/types";

import { Enemy } from "~~/shared/enums/enemy";

export const ENEMIES: EnemyCharacter[] = [
  {
    id: Enemy.BAT,
    image: "bat",
    name: "cave_bat",
    level: 1,
    stats: {
      damage: [2, 4],
      defence: 1,
      dex: 5,
    },
    resources: {
      energy: { current: 10, max: 10 },
      health: { current: 12, max: 12 },
    },
    loot: ["bat_wing", "tiny_claw"],
  },
  {
    id: Enemy.SKELETON,
    image: "skeleton",
    name: "skeleton_warrior",
    level: 3,
    stats: {
      damage: [4, 8],
      defence: 3,
      dex: 2,
    },
    resources: {
      energy: { current: 8, max: 8 },
      health: { current: 25, max: 25 },
    },
    loot: ["bone", "rusty_sword"],
  },
  {
    id: Enemy.GOBLIN,
    image: "goblin",
    name: "goblin_rider",
    level: 2,
    stats: {
      damage: [3, 6],
      defence: 2,
      dex: 4,
    },
    resources: {
      energy: { current: 12, max: 12 },
      health: { current: 18, max: 18 },
    },
    loot: ["goblin_ear", "coin_pouch"],
  },
];
