import { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemText,
} from "@mui/material";
import { Notifications, NotificationsNone } from "@mui/icons-material";

function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "Khách hàng mới",
      message: "Có 3 khách hàng mới đăng ký hôm nay",
      time: "2 phút trước",
      isRead: false,
    },
    {
      id: 2,
      title: "Hợp đồng sắp hết hạn",
      message: "Hợp đồng HD001 sẽ hết hạn vào ngày mai",
      time: "1 giờ trước",
      isRead: false,
    },
    {
      id: 3,
      title: "Cập nhật hệ thống",
      message: "Hệ thống đã được cập nhật lên phiên bản mới",
      time: "3 giờ trước",
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notificationId) => {
    // TODO: Mark notification as read and navigate if needed
    console.log("Notification clicked:", notificationId);
    handleClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge badgeContent={unreadCount} color="error">
          {unreadCount > 0 ? <Notifications /> : <NotificationsNone />}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 320,
            maxWidth: 400,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6">Thông báo</Typography>
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <MenuItem>
            <Typography variant="body2" color="text.secondary">
              Không có thông báo nào
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              sx={{
                py: 1.5,
                px: 2,
                borderLeft: notification.isRead ? "none" : "3px solid",
                borderColor: "primary.main",
                backgroundColor: notification.isRead
                  ? "inherit"
                  : "action.hover",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle2" noWrap>
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                }
              />
            </MenuItem>
          ))
        )}

        <Divider />

        <MenuItem onClick={handleClose}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ width: "100%", textAlign: "center" }}
          >
            Xem tất cả thông báo
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default NotificationMenu;
