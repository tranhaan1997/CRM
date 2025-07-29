import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnected, addMessage } from "~/redux/Wss/websocketSlice";
import { sendMessageAction } from "~/wss/websocketActions";
import { initWebSocket } from "~/wss/socket";
import { getCookieValue, WSS } from "~/utils/constants";

export function useWebSocketListener(enabled = true) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.operators?.items);

  useEffect(() => {
    if (!enabled) return; // Không gắn listener nếu chưa sẵn sàng
    const socket = initWebSocket(WSS);
    const onOpen = () => {
      dispatch(setConnected(true));
      // mở kết nối thì gửi thông tin xác thực
      // call xác thực WWS
      const SignalToken = getCookieValue("a-signaltoken");

      if (SignalToken) {
        if (items.length > 0) {
          const login = {
            App: "CONNECTION",
            FullName: items[0]?.OPER_NAME,
            Token: SignalToken,
            UserName: items[0]?.USERNAME,
          };
          dispatch(sendMessageAction(JSON.stringify(login)));
        }
      }
    };
    const onMessage = (event) => dispatch(addMessage(event.data));
    const onClose = () => dispatch(setConnected(false));
    const onError = (err) => console.error("WebSocket Error:", err);

    socket.addEventListener("open", onOpen);
    socket.addEventListener("message", onMessage);
    socket.addEventListener("close", onClose);
    socket.addEventListener("error", onError);

    return () => {
      socket.removeEventListener("open", onOpen);
      socket.removeEventListener("message", onMessage);
      socket.removeEventListener("close", onClose);
      socket.removeEventListener("error", onError);
    };
  }, [enabled]);
}
