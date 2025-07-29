import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import theme from "./theme";

import "./index.css";
import App from "./App.jsx";
import { AppContext } from "./AppContext";
import { ToastContainer } from "react-toastify";

// kiểm tra để hide header/
let header;
try {
  header = window.self !== window.top;
} catch {
  // Nếu khác domain sẽ vào đây => coi như chắc chắn đang trong iframe
  header = true;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme} noSsr disableTransitionOnChange>
      <CssBaseline />
      <AppContext.Provider value={{ header }}>
        <App />
        <ToastContainer />
      </AppContext.Provider>
    </ThemeProvider>
  </Provider>
);
