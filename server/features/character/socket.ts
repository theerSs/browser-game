import type { AppEvents } from "~~/shared/types";
import type { PlayerCharacter } from "~~/shared/types/player";
import type { Server, Socket } from "socket.io";

import { listenCharacter } from "./handlers";

export default function characterHandler(io: Server) {
  io.on("connection", (socket: Socket<AppEvents>) => {
    socket.on("character:listen", (characterId: PlayerCharacter["id"]) => listenCharacter(socket, io, characterId));
  });
}
