import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

function CollapseToggle({ collapsed, onToggleCollapsed }) {
  const renderCollapsedToggle = () => (
    <Tooltip title="Thu gọn" placement="right">
      <ListItemButton
        onClick={onToggleCollapsed}
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
          <ChevronRight />
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );

  const renderExpandedToggle = () => (
    <ListItemButton
      onClick={onToggleCollapsed}
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
          mr: 1,
          justifyContent: "center",
          color: "text.primary",
        }}
      >
        <ChevronLeft />
      </ListItemIcon>
      <ListItemText
        primary="Thu gọn"
        sx={{
          opacity: 1,
          "& .MuiListItemText-primary": {
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        }}
      />
    </ListItemButton>
  );

  return (
    <Box sx={{ px: 1, pb: 1 }}>
      <ListItem disablePadding>
        {collapsed ? renderCollapsedToggle() : renderExpandedToggle()}
      </ListItem>
    </Box>
  );
}

export default CollapseToggle;