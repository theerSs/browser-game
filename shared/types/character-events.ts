import type { InventoryItem, PlayerCharacter } from "./player";

export type CharacterEvents = {
  "character:listen": (characterId: PlayerCharacter["id"]) => void;
  "character:updated": (playerCharacter: PlayerCharacter) => void;
  "character:equip": (itemId: InventoryItem["id"]) => void;
};
