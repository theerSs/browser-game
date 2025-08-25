import type { UserWithId } from "~~/server/configs/auth";

import { CharacterRepository } from "~~/server/repositories";

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateCharacterBody>(event);
  const user: UserWithId = event.context.user;

  if (!body.name || !user) {
    return createError({
      status: 400,
      message: "Missing required fields: name",
    });
  }

  await CharacterRepository.createCharacter(user.id, body.name);

  return {
    statusCode: 201,
    message: "Character created successfully",
  };
});
