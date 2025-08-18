import type { Character } from "~~/shared/types/character";

export default defineEventHandler((): Character => {
  return {
    id: Math.random().toString(),
    image: "player",
    name: "Anton",
    level: 2,
    stats: {
      damage: [5, 9],
      defence: 3,
      dex: 4,
    },
    resources: {
      energy: { current: 15, max: 15 },
      health: { current: 30, max: 30 },
    },
  };
});
