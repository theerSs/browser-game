import type { NitroApp } from "nitropack";

import { Server as Engine } from "engine.io";
import { Server } from "socket.io";

import characterHandler from "../features/character/socket";
import combatHandler from "../features/combat/socket/combat-handler";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  combatHandler(io);
  characterHandler(io);

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req as any, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // @ts-expect-error private method and property
        engine.prepare(peer._internal.nodeReq);
        // @ts-expect-error private method and property
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
      },
    },
  }));
});
