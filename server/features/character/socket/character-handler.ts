import type { CharacterSocket, InventoryItem } from "~~/shared/types";
import type { Server } from "socket.io";

import { listenCharacter } from "./handlers";
import { equipItem } from "./handlers/equip-item";

export default function characterHandler(io: Server) {
  io.on("connection", (socket: CharacterSocket) => {
    socket.on("character:listen", (characterId: PlayerCharacter["id"]) => listenCharacter(socket, characterId));
    socket.on("character:equip", (itemId: InventoryItem["id"]) => equipItem(socket, itemId));
  });
}
