import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, BusinessCenter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "~/AppContext";

import Sidebar from "./Sidebar/Sidebar";
import ModeSwitcher from "../UI/ModeSwitcher";
import NotificationMenu from "./Header/NotificationMenu";
import Header from "./Header/Header";
import LogoLight from "~/assets/Logo/logo_act_white_theme.png";
import LogoDark from "~/assets/Logo/logo_act_dark_theme.png";

function MainLayout({ children }) {
  const theme = useTheme();
  const { header } = useAppContext();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarCollapse = () => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newCollapsed));
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  // Effect để xử lý trạng thái sidebar theo responsive
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);
  let sidebarWidth;

  if (!isMobile && sidebarOpen) {
    if (sidebarCollapsed) {
      sidebarWidth = "75px";
    } else {
      sidebarWidth = "250px";
    }
  } else {
    sidebarWidth = '0px';
  }
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {!header && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "background.paper",
            color: "text.primary",
            boxShadow: "none",
            borderBottom: 1,
            borderColor: "divider",
            minHeight: "48px",
          }}
        >
          <Toolbar sx={{ minHeight: "48px !important", height: "48px" }}>
            {/* Nút menu trên mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleSidebarToggle}
              sx={{
                mr: 1,
                display: { xs: "block", md: "none" },
                color: "text.primary",
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo và tên dự án */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Box
                sx={{
                  mr: 1,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleLogoClick}
              >
                <img
                  src={isDark ? LogoDark : LogoLight}
                  alt="Logo"
                  style={{ height: "100%", objectFit: "contain" }}
                />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={handleLogoClick}
              >
                CRM System
              </Typography>
            </Box>

            {/* Các icon bên phải */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                height: "48px",
              }}
            >
              <ModeSwitcher />
              <NotificationMenu />
              <Header />
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={handleSidebarCollapse}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          marginTop: header ? "0px" : "55px",
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth})`,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;