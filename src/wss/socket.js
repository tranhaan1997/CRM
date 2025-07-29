import ReconnectingWebSocket from "reconnecting-websocket";

let socket = null;

export function initWebSocket(url) {
  if (!socket) {
    socket = new ReconnectingWebSocket(url, [], {
      reconnectInterval: 10000,
      maxRetries: Infinity,
    });
  }
  return socket;
}

export function getWebSocket() {
  return socket;
}

export function closeWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
