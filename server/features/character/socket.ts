import type { AppEvents } from "~~/shared/types";
import type { PlayerCharacter } from "~~/shared/types/player";
import type { Server, Socket } from "socket.io";

import db from "~~/server/configs/db";

export default function characterHandler(io: Server) {
  io.on("connection", (socket: Socket<AppEvents>) => {
    socket.on("character:listen", async (characterId: PlayerCharacter["id"]) => {
      const selectedCharacter = await db.query.character.findFirst({
        where: (fields, { eq }) => eq(fields.id, characterId),
      });

      if (!selectedCharacter) {
        return;
      }

      socket.join(`character-${characterId}`);
      io.to(`character-${characterId}`).emit("character:updated", selectedCharacter);
    });
  });
}
