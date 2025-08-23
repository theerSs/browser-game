import type { Socket } from "socket.io";

export function emitError(socket: Socket<AppEvents>, code: CombatErrorCode, message: string) {
  socket.emit("combat:error", { code, message });
}
