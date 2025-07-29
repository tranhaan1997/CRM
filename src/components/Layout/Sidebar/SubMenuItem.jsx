import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function SubMenuItem({ item, onSubmenuClick }) {
  const handleClick = () => {
    if (!item.isTitle && item.path) {
      onSubmenuClick(item);
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleClick}
        disabled={item.isTitle}
        sx={{
          pl: 4,
          minHeight: 40,
          "&:hover": {
            backgroundColor: item.isTitle ? "transparent" : "action.hover",
          },
          cursor: item.isTitle ? "default" : "pointer",
        }}
      >
        {item.icon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 2,
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            {item.icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={item.label}
          sx={{
            opacity: 1,
            "& .MuiListItemText-primary": {
              fontSize: "0.8125rem",
              fontWeight: 400,
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default SubMenuItem;