import _ from "lodash";

import type { EnemyCharacter } from "../../types";

import { Enemy } from "../../enums";

const ENEMIES: Record<Enemy, EnemyCharacter> = {
  [Enemy.BAT]: {
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
    goldRange: [0, 5],
    expGain: 5,
  },
  [Enemy.SKELETON]: {
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
    goldRange: [5, 30],
    expGain: 25,
  },
  [Enemy.GOBLIN]: {
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
    goldRange: [5, 20],
    expGain: 15,
  },
} as const;

export function getEnemy(enemyId: Enemy): EnemyCharacter {
  return _.cloneDeep(ENEMIES[enemyId]);
}
