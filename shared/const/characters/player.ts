import type { PlayerCharacter } from "~~/shared/types";

export const PLAYER: PlayerCharacter = {
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
  inventory: {
    potions: {
      health: {
        name: "health_potion",
        amount: 2,
        healAmount: 0.2,
      },
      energy: {
        name: "energy_potion",
        amount: 2,
        healAmount: 0.1,
      },
    },
    gold: 0,
    items: [],
  },
};
