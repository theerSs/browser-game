import db from "~~/server/configs/db";
import { character } from "~~/server/configs/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return createError({
      statusCode: 400,
      message: "No id provided",
    });
  }

  await db.delete(character).where(eq(character.id, id));

  return {
    statusCode: 200,
    message: `Character with id: ${id} deleted successfully`,
  };
});
