import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      /* eslint-disable no-undef */
      "~": path.resolve(__dirname, "./src"), // Cấu hình alias cho thư mục src
    },
  },
  server: {
    open: true, // Tự động mở trình duyệt khi chạy lệnh `npm run dev`
    port: 5173, // Cổng mặc định
    host:true
  },
});
