import type { PlayerCharacter } from "./player";

export type CharacterEvents = {
  "character:listen": (characterId: PlayerCharacter["id"]) => void;
  "character:updated": (playerCharacter: PlayerCharacter) => void;
};
