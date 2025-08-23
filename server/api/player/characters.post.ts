import type { UserWithId } from "~~/server/configs/auth";
import type { CreateCharacterBody, PlayerCharacter } from "~~/shared/types/player";

import db from "~~/server/configs/db";
import { character } from "~~/server/configs/db/schema";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateCharacterBody>(event);
  const user: UserWithId = event.context.user;

  if (!body.name || !user) {
    return createError({
      status: 400,
      message: "Missing required fields: name",
    });
  }

  const newCharacter: PlayerCharacter = {
    id: uuidv4(),
    image: "player",
    name: "Anton",
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

  await db.insert(character).values({
    ...newCharacter,
    userId: user.id,
  });

  return {
    statusCode: 201,
    message: "Character created successfully",
    character: newCharacter,
  };
});
