import db from "~~/server/configs/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return createError({
      statusCode: 400,
      message: "No id provided",
    });
  }

  const characterData = await db.query.character.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  });

  if (!characterData) {
    return createError({
      status: 404,
      message: "Character not found",
    });
  }

  return characterData;
});
