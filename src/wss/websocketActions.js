import { getWebSocket } from "./socket";

export const sendMessageAction = (msg) => {
  return () => {
    const socket = getWebSocket();
    // console.log("🚀 ~ sendMessageAction ~ socket:", socket);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
      //   console.log("🚀 ~ sendMessageAction ~ msg:", msg);
    } else {
      console.warn("WebSocket not connected");
    }
  };
};
