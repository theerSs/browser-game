import type { PlayerCharacter } from "~~/shared/types/player";
import type { Server, Socket } from "socket.io";

import { CharacterRepository } from "~~/server/repositories";

export async function listenCharacter(socket: Socket<AppEvents>, io: Server, characterId: PlayerCharacter["id"]) {
  const selectedCharacter = await CharacterRepository.getCharacterById(characterId);

  if (!selectedCharacter) {
    return;
  }

  socket.join(`character-${characterId}`);
  io.to(`character-${characterId}`).emit("character:updated", selectedCharacter);
}
