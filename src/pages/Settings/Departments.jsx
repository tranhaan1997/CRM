import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";

function Departments() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh mục phòng ban
        </Typography>
        <Typography variant="body1">
          Trang quản lý phòng ban đang được phát triển...
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default Departments;