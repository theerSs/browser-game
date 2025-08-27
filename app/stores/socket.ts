import type { Socket } from "socket.io-client";

import { io } from "socket.io-client";

import type { SocketEvents } from "~/types";

export const useSocketStore = defineStore("useSocketStore", () => {
  const socket = ref<Socket<SocketEvents> | null>(null);
  const transport = ref<"N/A" | string>("N/A");

  function connect() {
    if (socket.value) {
      return;
    }

    const { csrf } = useCsrf();

    socket.value = io("", {
      extraHeaders: {
        "csrf-token": csrf,
      },
    });

    socket.value.on("connect", onConnect);
    socket.value.on("disconnect", onDisconnect);
  }

  function disconnect() {
    if (!socket.value)
      return;

    socket.value.off("connect", onConnect);
    socket.value.off("disconnect", onDisconnect);
    socket.value.close();
    socket.value = null;

    transport.value = "N/A";
  }

  function onConnect() {
    if (socket.value) {
      transport.value = socket.value.io.engine.transport.name;
      socket.value.io.engine.on("upgrade", (rawTransport) => {
        transport.value = rawTransport.name;
      });
    }
  }

  function onDisconnect() {
    transport.value = "N/A";
  }

  return { connect, disconnect, socket };
});
