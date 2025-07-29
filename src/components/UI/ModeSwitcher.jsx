import { useColorScheme } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return "light";
  }

  return (
    <>
      {mode === "dark" ? (
        <LightModeIcon
          onClick={() => setMode("light")}
          fontSize="small"
          title="Light mode"
          sx={{ cursor: "pointer" }}
        />
      ) : (
        <DarkModeIcon
          onClick={() => setMode("dark")}
          fontSize="small"
          title="Dark mode"
          sx={{ cursor: "pointer" }}
        />
      )}
    </>
  );
}

export default ModeSwitcher;
