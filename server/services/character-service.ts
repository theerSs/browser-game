import type { CharacterSocket } from "~~/shared/types";

import { CharacterRepository } from "../repositories";

export class CharacterService {
  constructor(
    private socket: CharacterSocket,
    private repo = CharacterRepository,
  ) {}

  async updateCharacter(character: PlayerCharacter) {
    await this.repo.updateCharacter(character);

    this.socket.emit("character:updated", character);
  }
}
