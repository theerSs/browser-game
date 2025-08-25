import type { Socket } from "socket.io";

import { CharacterRepository } from "../repositories";

export class CharacterService {
  constructor(
    private socket: Socket<AppEvents>,
    private repo = CharacterRepository,
  ) {}

  async updateCharacter(character: PlayerCharacter) {
    await this.repo.updateCharacter(character);

    this.socket.emit("character:updated", character);
  }
}
