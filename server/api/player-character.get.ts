import type { Character } from "~~/shared/types/character";

export default defineEventHandler((): Character => {
  return {
    id: Math.random().toString(),
    image: "player",
    name: "Antont",
    level: 15,
    stats: {
      damage: [30, 90],
      defence: 120,
      dex: 20,
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
