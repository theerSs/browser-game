import type { UserWithId } from "~~/server/configs/auth";
import type { CreateCharacterBody, PlayerCharacter } from "~~/shared/types/player";

import { createNewCharacter } from "~~/server/features/character/utils/create-new-character";
import { CharacterRepository } from "~~/server/repositories";
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

  const character = createNewCharacter(body);

  await CharacterRepository.createCharacter(user.id, character);

  return {
    statusCode: 201,
    message: "Character created successfully",
    character,
  };
});
