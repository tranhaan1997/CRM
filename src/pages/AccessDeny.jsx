import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { authAPI } from "~/apis/Systems/authAPI";
import empty_image from "~/assets/app/empty_stage_v3.svg";
import { SSO } from "~/utils/constants";
function AccessDeny() {
  const handleLogut = async () => {
    await authAPI.Logout();

    const ssoLoginUrl =
      `${SSO}?app_code=CRM&redirect_uri=` +
      encodeURIComponent(window.location.origin);
    window.location.href = ssoLoginUrl;
  };
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "120px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            bgcolor: (theme) => theme.palette.background.paper,
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
          }}
        >
          <Box
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <div
              style={{
                borderColor: "red",
                width: "360px",
                height: "240px",
                background: `transparent url(${empty_image}) no-repeat -700px -978px`,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5">
              Bạn không có quyền truy cập vào trang này.
            </Typography>
            <Typography>
              Vui lòng liên hệ với quản trị hệ thống để có quyền truy cập.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" color="primary" href="/">
                Quay lại
              </Button>
              <Button variant="outlined" color="warning" onClick={handleLogut}>
                Thoát
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default AccessDeny;
