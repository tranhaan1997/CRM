import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";

function Positions() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh mục vị trí công việc
        </Typography>
        <Typography variant="body1">
          Trang quản lý vị trí công việc đang được phát triển...
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default Positions;