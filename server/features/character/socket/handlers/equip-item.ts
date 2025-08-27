import type { CharacterSocket, InventoryItem } from "~~/shared/types";

import { CharacterRepository } from "~~/server/repositories";
import { CharacterService } from "~~/server/services";

import { CharacterEntity } from "../../domain/character";

export async function equipItem(socket: CharacterSocket, itemId: InventoryItem["id"]) {
  const characterId = socket.data.characterId;
  if (!characterId) {
    return;
  }

  const character = await CharacterRepository.getCharacterById(characterId);
  if (!character) {
    return;
  }

  const characterEntity = new CharacterEntity(character);
  const item = characterEntity.findInventoryItemById(itemId);

  if (!item) {
    return;
  }

  const equipped = characterEntity.equip(item);
  if (!equipped) {
    return;
  }

  await new CharacterService(socket).updateCharacter(characterEntity.raw);
}
