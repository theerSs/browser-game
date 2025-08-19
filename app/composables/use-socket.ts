import { io } from "socket.io-client";

export function useSocket() {
  const { csrf } = useCsrf();

  const socket = io("", {
    extraHeaders: {
      "csrf-token": csrf,
    },
  });
  const isConnected = ref(false);
  const transport = ref("N/A");

  if (socket.connected) {
    onConnect();
  }

  function onConnect() {
    isConnected.value = true;
    transport.value = socket.io.engine.transport.name;
    socket.io.engine.on("upgrade", (rawTransport) => {
      transport.value = rawTransport.name;
    });
  }

  function onDisconnect() {
    isConnected.value = false;
    transport.value = "N/A";
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);

  onBeforeUnmount(() => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.close();
  });

  return socket;
}
