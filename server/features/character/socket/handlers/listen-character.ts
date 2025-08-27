import type { CharacterSocket } from "~~/shared/types";

import { CharacterRepository } from "~~/server/repositories";

export async function listenCharacter(socket: CharacterSocket, characterId: PlayerCharacter["id"]) {
  const selectedCharacter = await CharacterRepository.getCharacterById(characterId);

  if (!selectedCharacter) {
    return;
  }

  socket.data.characterId = characterId;
  socket.join(characterId);
  socket.emit("character:updated", selectedCharacter);
}
