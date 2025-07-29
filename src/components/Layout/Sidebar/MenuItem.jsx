import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Collapse,
  List,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import SubMenuItem from "./SubMenuItem";

function MenuItem({ 
  item, 
  collapsed, 
  isMobile, 
  isOpen, 
  onMenuClick, 
  onSubmenuClick 
}) {
  const renderCollapsedMenuItem = () => (
    <Tooltip title={item.label} placement="right">
      <ListItemButton
        onClick={() => onMenuClick(item)}
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            color: "text.primary",
          }}
        >
          {item.icon}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );

  const renderExpandedMenuItem = () => (
    <ListItemButton
      onClick={() => onMenuClick(item)}
      sx={{
        minHeight: 48,
        px: 2.5,
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          color: "text.primary",
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        sx={{
          opacity: 1,
          "& .MuiListItemText-primary": {
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        }}
      />
      {item.hasSubmenu && isMobile && (
        isOpen ? <ExpandLess /> : <ExpandMore />
      )}
    </ListItemButton>
  );

  return (
    <>
      <ListItem disablePadding>
        {collapsed && !isMobile ? renderCollapsedMenuItem() : renderExpandedMenuItem()}
      </ListItem>

      {/* Submenu for mobile only */}
      {item.hasSubmenu && isMobile && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.submenu.map((submenuItem) => {
              if (submenuItem.isTitle) {
                return (
                  <ListItem key={submenuItem.id} disablePadding>
                    <ListItemText
                      primary={submenuItem.label}
                      sx={{
                        pl: 4,
                        py: 1,
                        "& .MuiListItemText-primary": {
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "text.secondary",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        },
                      }}
                    />
                  </ListItem>
                );
              }
              return (
                <SubMenuItem
                  key={submenuItem.id}
                  item={submenuItem}
                  onSubmenuClick={onSubmenuClick}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default MenuItem;