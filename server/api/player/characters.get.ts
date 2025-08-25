import { CharacterRepository } from "~~/server/repositories";

import type { UserWithId } from "../../configs/auth";

export default defineEventHandler(async (event): Promise<PlayerCharacterItem[]> => {
  const user: UserWithId = event.context.user;
  const characters = await CharacterRepository.getCharactersByUserId(user.id);
  return characters;
});
