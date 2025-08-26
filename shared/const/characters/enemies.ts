import _ from "lodash";

import type { EnemyCharacter, PlayerCharacter } from "../../types";

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

export function generateEnemy(enemyId: Enemy, characterLevel: PlayerCharacter["level"]): EnemyCharacter {
  const baseEnemy = _.cloneDeep(ENEMIES[enemyId]);
  const level = characterLevel > 5 ? _.random(characterLevel, characterLevel + 2) : characterLevel;

  const dmgScale = 1.5;
  const gScale = 3;
  const energyScale = 2;

  return {
    ...baseEnemy,
    level,
    stats: {
      damage: [
        Math.floor(baseEnemy.stats.damage[0] + level * dmgScale),
        Math.floor(baseEnemy.stats.damage[1] + level * dmgScale),
      ],
      defence: baseEnemy.stats.defence + Math.floor(level / 2),
      dex: baseEnemy.stats.dex + Math.floor(level / 3),
    },
    resources: {
      health: {
        max: Math.floor(baseEnemy.resources.health.max * level ** 1.3),
        current: Math.floor(baseEnemy.resources.health.max * level ** 1.3),
      },
      energy: {
        max: baseEnemy.resources.energy.max + level * energyScale,
        current: baseEnemy.resources.energy.max + level * energyScale,
      },
    },
    goldRange: [
      baseEnemy.goldRange[0] + level * gScale,
      baseEnemy.goldRange[1] + level * gScale,
    ],
    expGain: Math.floor(baseEnemy.expGain * level ** 1.2),
  };
}
