import { io, Socket } from "socket.io-client"
import type { AppEvents } from "~~/shared/types/socket-events";

export const useSocketStore = defineStore("useSocketStore", <T>() => {
  const socket = ref<Socket<AppEvents> | null>(null);
  const transport = ref<"N/A" | string>("N/A")
  
  function connect() {
    if(socket.value) {
      return
    }  
    
    const {csrf} = useCsrf()
    
    socket.value = io("", {
      extraHeaders: {
        "csrf-token": csrf
      }
    })
    
    socket.value.on("connect", onConnect)
    socket.value.on("disconnect", onDisconnect)
  }
  
  function disconnect() {
    if (!socket.value) return;

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
      console.info("Socket connection established")
    }
  }

  function onDisconnect() {
    transport.value = "N/A";
    console.info("Socket connection disposed")
  }

  return {connect, disconnect, socket}
})