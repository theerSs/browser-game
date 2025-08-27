import type { CombatSocket } from "~~/shared/types";

export function emitError(socket: CombatSocket, code: CombatErrorCode, message: string) {
  socket.emit("combat:error", { code, message });
}
