import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: {
    connected: false,
    onlines: [],
    groups: [],
    messages: [],
    lastMessages: {},
  },
  reducers: {
    setConnected(state, action) {
      state.connected = action.payload;
    },
    addMessage(state, action) {
      // console.log("🚀 ~ addMessage ~ action:", action);
      try {
        state.messages.push(JSON.parse(action.payload));
        state.lastMessages = JSON.parse(action.payload);
        if (state.messages.length > 50) {
          state.messages.shift(); // Xóa tin cũ nhất
        }
        var msg = JSON.parse(action.payload);
        if (msg?.App == "CLIENTLIST") {
          state.onlines = msg?.OnlineList || [];
        }
        if (msg?.App == "CONNECTED") {
          var newClient = {
            Id: msg?.Id,
            UserName: msg?.UserName,
            FullName: msg?.FullName,
            Message: "",
            Status: "Online",
            Time: msg.Time,
          };
          state.onlines.push(newClient);
        }
        if (msg?.App == "DISCONNECT") {
          state.onlines = state.onlines.filter(
            (client) => client.Id !== msg.Id
          );
        }
        if (msg?.App.startsWith("g_")) {
          const msg2 = JSON.parse(msg?.Message);
          // console.log("🚀 ~ addMessage ~ msg:", msg2);
          var gp = {
            App: msg?.App,
            Mesages: msg2,
          };
          // Tìm object theo App
          const item = state.groups.find((obj) => obj.App === gp.App);
          if (item) {
            // Nếu tồn tại, update Mesages
            item.Mesages = gp.Mesages;
          } else {
            // Nếu không có, thêm mới
            state.groups.push(gp);
          }
        }
        console.log("🚀 ~ addMessage ~ msg:", msg);
      } catch (error) {
        console.error("Chuỗi JSON không hợp lệ!", error);
      }
    },
    clearMessages(state) {
      state.messages = [];
      state.lastMessages = {};
    },
  },
});

export const { setConnected, addMessage, clearMessages } =
  websocketSlice.actions;
export default websocketSlice.reducer;
