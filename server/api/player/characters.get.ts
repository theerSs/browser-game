import type { PlayerCharacterItem } from "~~/shared/types/player";

import { eq } from "drizzle-orm";

import type { UserWithId } from "../../configs/auth";

import db from "../../configs/db";
import { character } from "../../configs/db/schema";

export default defineEventHandler(async (event): Promise<PlayerCharacterItem[]> => {
  const user: UserWithId = event.context.user;
  const existingCharacters = await db.select().from(character).where(eq(character.userId, user.id));

  return existingCharacters.map(character => ({
    id: character.id,
    image: character.image,
    name: character.name,
    level: character.level,
  }));
});
