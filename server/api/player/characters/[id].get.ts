import { CharacterRepository } from "~~/server/repositories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return createError({
      statusCode: 400,
      message: "No id provided",
    });
  }

  const character = await CharacterRepository.getCharacterById(id);

  if (!character) {
    return createError({
      status: 404,
      message: "Character not found",
    });
  }

  return character;
});
