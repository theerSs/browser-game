import { eq } from "drizzle-orm";

import type { UserWithId } from "../configs/auth";

import db from "../configs/db";
import { character } from "../configs/db/schema";

export class CharacterRepository {
  static async getCharacterById(id: PlayerCharacter["id"]): Promise<PlayerCharacter> {
    const foundCharacter = await db.query.character.findFirst({
      where: (fields, { eq }) => eq(fields.id, id),
    });

    if (!foundCharacter) {
      throw createError({
        statusCode: 404,
        statusMessage: "No character found",
      });
    }

    return foundCharacter;
  }

  static async updateCharacter(data: PlayerCharacter): Promise<boolean> {
    const result = await db.update(character).set({
      level: data.level,
      resources: data.resources,
      inventory: data.inventory,
      stats: data.stats,
      experience: data.experience,
    }).where(eq(character.id, data.id));

    return result.rowsAffected > 0;
  }

  static async deleteCharacter(id: PlayerCharacter["id"]): Promise<boolean> {
    const result = await db.delete(character).where(eq(character.id, id));

    return result.rowsAffected > 0;
  }

  static async getCharactersByUserId(id: UserWithId["id"]): Promise<PlayerCharacterItem[]> {
    const characters = await db.select().from(character).where(eq(character.userId, id));
    return characters.map(character => ({
      id: character.id,
      image: character.image,
      name: character.name,
      level: character.level,
    }));
  }

  static async createCharacter(userId: UserWithId["id"], name: string): Promise<boolean> {
    const result = await db.insert (character).values({
      name,
      userId,
    });

    return result.rowsAffected > 0;
  }
}
