import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";

function Users() {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản lý người dùng
        </Typography>
        <Typography variant="body1">
          Trang quản lý người dùng đang được phát triển...
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default Users;