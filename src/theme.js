import { createTheme } from "@mui/material/styles";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTTER_HEIGHT = "56px";

// Create a theme instance.
const theme = createTheme({
  configSite: {
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTTER_HEIGHT,
    scrollbarWidth: 10,
    scrollbarHeight: 10,
  },
  app: {
    appBarHeight: "48px",
    appMenuLeft: "240px",
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: { main: "#edf2f9" },
        background: {
          default: "#f9fafd",
          // default: "#eeeff1",
          secondary: "#e2e2e24f",
          paper: "#ffffff",
          // headerGrid: "#e2e2e24f !important"
          headerGrid: "#f3f2f8 !important",
          fixColumnBg: "#faf9fe",
          fixColumnHover: "#eff0f3",
        },
        text: { primary: "#344050" },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#0b1727",
          secondary: "#121e2d3d",
          paper: "#121e2d",
          headerGrid: "#273240 !important",
          fixColumnBg: "#0b1727",
          fixColumnHover: "#1f2a38",
        },
        text: { primary: "#d8e2ef" },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdc3c7",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#90caf9",
            cursor: "pointer",
          },
          "& .MuiDataGrid-scrollbar": {
            "&:hover::-webkit-scrollbar": {
              width: "10px",
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.MuiTypography-body1": { fontSize: "0.825rem" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            height: "38px",
          },
          "& .MuiInputBase-input": {
            padding: "8px 12px",
          },
          "& .MuiOutlinedInput-root": {
            "& .MuiInputBase-input": {
              padding: "8px 12px",
            },
          },
          "& .MuiInputLabel-root": {
            top: "50%",
            transform: "translate(14px, -50%) scale(1)",
            "&.Mui-focused, &.MuiFormLabel-filled": {
              top: 0,
              transform: "translate(14px, -9px) scale(0.75)",
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            height: "38px",
          },
          "& .MuiSelect-select": {
            padding: "8px 12px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "8px 12px",
          minHeight: "22px",
        },
      },
    },
  },
});

export default theme;
