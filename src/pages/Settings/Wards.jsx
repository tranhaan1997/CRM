import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";

function Wards() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh mục phường
        </Typography>
        <Typography variant="body1">
          Trang quản lý phường đang được phát triển...
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default Wards;