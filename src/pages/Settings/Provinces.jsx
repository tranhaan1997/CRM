import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";

function Provinces() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh mục tỉnh
        </Typography>
        <Typography variant="body1">
          Trang quản lý tỉnh đang được phát triển...
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default Provinces;