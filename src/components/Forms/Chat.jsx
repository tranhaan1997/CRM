import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
  Typography,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAction } from "~/wss/websocketActions";

function Chat() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const onlines = useSelector((state) => state.websocket?.onlines);
  const operator = useSelector((state) => state.operators?.items[0] || {});
  const groups = useSelector((state) => state.websocket?.groups);
  const lastMessages = useSelector((state) => state.websocket?.lastMessages);

  // console.log("🚀 ~ Chat ~ groups:", groups);

  const [selectedItem, setSelectedItem] = useState({});
  const [msg, setMsg] = useState("");

  const messages = useMemo(() => {
    const arr = [];
    if (selectedItem && groups && groups.length > 0) {
      groups.forEach((group) => {
        const group_name = `g_${selectedItem.UserName}_${operator.USERNAME}`;
        if (group.App === group_name && group.Mesages?.length) {
          group.Mesages.forEach((item, index) => {
            arr.push({
              id: index,
              user: item.UserName,
              text: item.Message,
              mine: item.UserName === operator.USERNAME,
            });
          });
        }
      });
    }
    return arr;
  }, [groups, selectedItem, operator.USERNAME]);

  const handleClick = (u) => {
    const chatGroup = {
      App: `g_${u}_${operator.USERNAME}`,
      UserName: operator.USERNAME,
      To: u,
    };
    dispatch(sendMessageAction(JSON.stringify(chatGroup)));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn xuống dòng nếu không muốn multi-line
      handleSend();
    }
  };

  const handleSend = () => {
    if (msg == "") return;
    const chatMsg = {
      App: "CHATTO",
      UserName: operator.USERNAME,
      To: selectedItem.UserName,
      Message: msg,
    };

    dispatch(sendMessageAction(JSON.stringify(chatMsg)));
    setMsg("");
    handleClick(selectedItem.UserName);
  };

  useEffect(() => {
    if (lastMessages && lastMessages.App === "CHATTO") {
      handleClick(lastMessages.UserName);
    }
  }, [lastMessages]);

  const uniqueUsername = useMemo(() => {
    return Array.from(
      new Map(onlines?.map((item) => [item.UserName, item])).values()
    );
  }, [onlines]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: `calc(100vh - 60px)`,
        }}
      >
        {/* Danh sách hội thoại */}
        <Box
          sx={{
            width: 300,
            bgcolor: theme.palette.background.paper,
            borderRight: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Danh sách
          </Typography>
          <Divider />
          <List sx={{ flex: 1 }}>
            {uniqueUsername &&
              uniqueUsername.map((_, i) => {
                const date = new Date(Number(_.Time));
                // Định dạng giờ phút giây (dd/MM/yyyy HH:mm:ss)
                const formatted =
                  date.getDate().toString().padStart(2, "0") +
                  "/" +
                  (date.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  date.getFullYear() +
                  " " +
                  date.getHours().toString().padStart(2, "0") +
                  ":" +
                  date.getMinutes().toString().padStart(2, "0") +
                  ":" +
                  date.getSeconds().toString().padStart(2, "0");
                if (_.UserName !== operator.USERNAME) {
                  return (
                    <ListItem
                      // component="button"
                      key={i}
                      alignItems="flex-start"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedItem(_);
                        handleClick(_.UserName);
                      }} // Thêm sự kiện click
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {_.FullName
                            ? _.FullName.charAt(0).toUpperCase()
                            : "?"}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={_.FullName}
                        secondary={formatted}
                      />
                    </ListItem>
                  );
                }
              })}
          </List>
        </Box>

        {/* Cửa sổ chat */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #ddd",
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6">
              {(selectedItem && selectedItem?.FullName) || "Welcome to AMS"}
            </Typography>
          </Box>

          {/* Nội dung chat */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent: msg.mine ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: "60%",
                    bgcolor: msg.mine ? "#0068FF" : "#e4e6eb",
                    color: msg.mine ? "white" : "black",
                    borderRadius: 2,
                  }}
                >
                  <Typography>{msg.text}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Ô nhập tin */}
          {selectedItem?.UserName && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderTop: "1px solid #ddd",
                bgcolor: theme.palette.background.paper,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập tin nhắn..."
                sx={{ mx: 1 }}
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Chat;
