import { Box, Typography } from "@mui/material";
import MainLayout from "~/components/Layout/MainLayout";
import Button from "@mui/material/Button";

function Provinces() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box display>
          <Typography variant="h6" gutterBottom>
            Danh mục tỉnh
          </Typography>
          <Button variant="contained">Thêm mới</Button>
        </Box>

        <Typography variant="body1">
          Trang quản lý tỉnh đang được phát triển...
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default Provinces;
