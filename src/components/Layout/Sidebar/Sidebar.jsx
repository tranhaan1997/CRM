import { useState, useEffect } from "react";
import { Box, Drawer, List, useMediaQuery } from "@mui/material";
import {
  Home,
  Settings,
  People,
  Business,
  Work,
  Map,
  MapsHomeWork,
  AddRoad,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";
import CollapseToggle from "./CollapseToggle";
import SubmenuDrawer from "./SubmenuDrawer";
import { useAppContext } from "~/AppContext";

const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

function Sidebar({ open, onClose, collapsed, onToggleCollapsed }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  // Khởi tạo trạng thái submenu từ localStorage và URL hiện tại
  const [openSettings, setOpenSettings] = useState(() => {
    const saved = localStorage.getItem("submenuSettingsOpen");
    const isSettingsPath = location.pathname.startsWith("/settings");
    return saved ? JSON.parse(saved) : isSettingsPath;
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState([]);

  const menuItems = [
    {
      id: "home",
      label: "Trang chủ",
      icon: <Home />,
      path: "/",
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: <Settings />,
      hasSubmenu: true,
      submenu: [
        {
          id: "user-management-group",
          label: "Quản lý người dùng",
          isTitle: true,
        },
        {
          id: "users",
          label: "Quản lý người dùng",
          icon: <People />,
          path: "/settings/users",
        },
        {
          id: "departments",
          label: "Danh mục phòng ban",
          icon: <Business />,
          path: "/settings/departments",
        },
        {
          id: "positions",
          label: "Danh mục vị trí công việc",
          icon: <Work />,
          path: "/settings/positions",
        },
        {
          id: "location-management-group",
          label: "Quản lý vị trí địa lý",
          isTitle: true,
        },
        {
          id: "provinces",
          label: "Danh mục tỉnh",
          icon: <Map />,
          path: "/settings/provinces",
        },
        {
          id: "wards",
          label: "Danh mục phường",
          icon: <MapsHomeWork />,
          path: "/settings/wards",
        },
        {
          id: "streets",
          label: "Danh mục đường",
          icon: <AddRoad />,
          path: "/settings/streets",
        },
      ],
    },
  ];

  // Effect để theo dõi thay đổi URL và tự động mở submenu (chỉ khi chưa có tương tác thủ công)
  useEffect(() => {
    const isSettingsPath = location.pathname.startsWith("/settings");
    const hasManualInteraction = localStorage.getItem(
      "submenuManualInteraction"
    );

    if (isSettingsPath && !openSettings && !hasManualInteraction) {
      setOpenSettings(true);
      localStorage.setItem("submenuSettingsOpen", JSON.stringify(true));
    }
  }, [location.pathname, openSettings]);

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      if (isMobile) {
        // Toggle submenu for mobile
        if (item.id === "settings") {
          const newOpenState = !openSettings;
          setOpenSettings(newOpenState);
          localStorage.setItem(
            "submenuSettingsOpen",
            JSON.stringify(newOpenState)
          );
          localStorage.setItem("submenuManualInteraction", "true");
        }
      } else {
        // Show drawer for desktop (both collapsed and expanded)
        setDrawerContent(item.submenu);
        setDrawerOpen(true);
      }
    } else {
      navigate(item.path);
      if (isMobile) {
        onClose();
      }
    }
  };

  const handleSubmenuClick = (submenuItem) => {
    navigate(submenuItem.path);
    setDrawerOpen(false);
    if (isMobile) {
      onClose();
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const { header } = useAppContext();

  const sidebarContent = (
    <Box
      sx={{
        width: collapsed && !isMobile ? COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        height: "100%",
        backgroundColor: "background.paper",
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginTop: header ? "0px" : "55px",
      }}
    >
      {/* Menu Items */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <List sx={{ pt: 1, overflow: "hidden" }}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isMobile={isMobile}
              isOpen={openSettings}
              onMenuClick={handleMenuClick}
              onSubmenuClick={handleSubmenuClick}
            />
          ))}
        </List>
      </Box>

      {/* Toggle Button at Bottom */}
      {!isMobile && (
        <CollapseToggle
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
        />
      )}

      {/* Submenu Drawer - For both collapsed and expanded states */}
      {!isMobile && (
        <SubmenuDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          drawerContent={drawerContent}
          onSubmenuClick={handleSubmenuClick}
          collapsedWidth={COLLAPSED_WIDTH}
          sidebarWidth={SIDEBAR_WIDTH}
          isCollapsed={collapsed}
        />
      )}
    </Box>
  );

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: collapsed && !isMobile ? COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          boxSizing: "border-box",
          borderRight: 1,
          borderColor: "divider",
          // marginTop: "48px",
          // height: "calc(100% - 48px)",
          transition: "width 0.3s ease",
          overflow: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
}

export default Sidebar;
