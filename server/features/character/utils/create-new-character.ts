import type { CreateCharacterBody, PlayerCharacter } from "~~/shared/types/player";

import { v4 as uuidv4 } from "uuid";

export function createNewCharacter(data: CreateCharacterBody): PlayerCharacter {
  return {
    id: uuidv4(),
    image: "player",
    name: data.name,
    level: 1,
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
}
