import { CharacterRepository } from "~~/server/repositories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return createError({
      statusCode: 400,
      message: "No id provided",
    });
  }

  await CharacterRepository.deleteCharacter(id);

  return {
    statusCode: 200,
    message: `Character with id: ${id} deleted successfully`,
  };
});
