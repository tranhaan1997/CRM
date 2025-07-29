import {
  Drawer,
  List,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import SubMenuItem from "./SubMenuItem";

function SubmenuDrawer({ 
  open, 
  onClose, 
  drawerContent, 
  onSubmenuClick, 
  collapsedWidth,
  sidebarWidth,
  isCollapsed = true 
}) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          marginTop: "48px",
          height: "calc(100% - 48px)",
          borderRight: 1,
          borderColor: "divider",
          position: "fixed",
          left: isCollapsed ? `${collapsedWidth}px` : `${sidebarWidth}px`,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          boxShadow: "none",
        },
      }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          invisible: true,
        },
      }}
    >
      <Paper
        sx={{
          height: "100%",
          backgroundColor: "background.paper",
        }}
      >
        <List sx={{ pt: 1 }}>
          {drawerContent.map((submenuItem) => {
            if (submenuItem.isTitle) {
              return (
                <Box key={submenuItem.id} sx={{ px: 2, py: 1, mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {submenuItem.label}
                  </Typography>
                </Box>
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
      </Paper>
    </Drawer>
  );
}

export default SubmenuDrawer;