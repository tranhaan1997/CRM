import { Button } from "@mui/material";
import { useEffect } from "react";
import { authAPI } from "~/apis/Systems/authAPI";
import { operatorsAPI } from "~/apis/Systems/operatorsAPI";
import Preloader from "~/components/Common/Preloader";
import { createCookie } from "~/utils/constants";

function CallbackAuth() {
  const authToken = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const redirectUri = params.get("redirect_uri");
    if (code) {
      var data = {
        grant_type: "authorization_code",
        code: code,
      };
      const res = await authAPI.Token(data);
      if (res?.O_RESULT == 1) {
        const chk = await operatorsAPI.info_Me();
        console.log("🚀 ~ authToken ~ chk:", res);
        if (res?.O_CUSTOMS?.SignalToken) {
          createCookie(
            "a-signaltoken",
            res?.O_CUSTOMS?.SignalToken,
            7 * 24 * 60 * 60 * 1000 // 7 ngày (ms)
          );
        }
        if (res?.O_CUSTOMS?.RefreshToken) {
          createCookie(
            "a-refreshtoken",
            res?.O_CUSTOMS?.RefreshToken,
            7 * 24 * 60 * 60 * 1000 // 7 ngày (ms)
          );
        }
        console.log("🚀 ~ authToken ~ chk:", chk);
        if (chk?.O_RESULT == 1) {
          window.location.href = redirectUri;
        } else {
          //authToken();
        }
      }
    }
  };

  useEffect(() => {
    authToken();
  }, []);

  return (
    <>
      <Preloader />
    </>
  );
}

export default CallbackAuth;
