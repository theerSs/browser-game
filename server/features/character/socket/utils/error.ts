import type { CharacterSocket } from "~~/shared/types";

export function emitError(socket: CharacterSocket, code: CombatErrorCode, message: string) {
  socket.emit("combat:error", { code, message });
}
