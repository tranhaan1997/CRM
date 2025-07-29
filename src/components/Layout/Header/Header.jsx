import { useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { AccountCircle, Lock, Logout } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { authAPI } from "~/apis/Systems/authAPI";
import { createCookie, SSO } from "~/utils/constants";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userInfo = useSelector((state) => state.operators?.items);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const res = await authAPI.Logout();
    if (res?.O_RESULT == 1) {
      createCookie("a-signaltoken", "", 1);
      createCookie("a-refreshtoken", "", 1);
      window.location.href = "/";
    }
    handleClose();
  };

  const handleUserInfo = () => {
    console.log("Navigate to user info");
    window.location.href = "/";
    handleClose();
  };

  const handleChangePassword = () => {
    console.log("Navigate to change password");
    window.location.href = `${SSO}?uid=SSO-${
      userInfo[0]?.USERNAME
    }&changepass=1&redirect_uri=${encodeURIComponent(window.location.href)}`;
    handleClose();
  };

  const userName = userInfo[0]?.OPER_NAME || userInfo[0]?.USERNAME || "User";
  const userEmail =
    userInfo[0]?.USERNAME + "@vienthongact.vn" || "user@example.com";

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {userName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
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
          <Typography variant="subtitle2" noWrap>
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {userEmail}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleUserInfo}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Thông tin người dùng</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleChangePassword}>
          <ListItemIcon>
            <Lock fontSize="small" />
          </ListItemIcon>
          <ListItemText>Đổi mật khẩu</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Đăng xuất</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Header;
