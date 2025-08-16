import type { Character } from "~~/shared/types/character";

export default defineEventHandler((): Character => {
  return {
    id: Math.random().toString(),
    image: "goblin",
    name: "Goblin warrior",
    level: 15,
    stats: {
      damage: [15, 65],
      defence: 120,
      dex: 15,
    },
    resources: {
      health: {
        current: 60,
        max: 120,
      },
      energy: {
        current: 10,
        max: 130,
      },
    },
  };
});
