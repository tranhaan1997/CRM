import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "~/components/Common/Preloader";
import { operatorsMe } from "~/redux/Systems/operatorsSlice";
import { permissionsMe } from "~/redux/Systems/permissionsSlice";
import { useWebSocketListener } from "~/hooks/useWebSocketListener";

function RequireAuth({ children }) {
  const [wsReady, setWsReady] = useState(false); // kiểm soát khi nào mở WebSocket
  // Chỉ khởi động WebSocket listener khi wsReady = true
  useWebSocketListener(wsReady);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.operators?.loading);

  const loadUserInfo = async () => {
    // Load thông tin người dùng
    const result = await dispatch(operatorsMe()).unwrap();
    // Load danh sách quyền, sau khi có thông tin đăng nhập
    if (result?.O_RESULT == 1) {
      await dispatch(permissionsMe());
      // Sau khi user xác thực, mới mở WebSocket
      setWsReady(true);
    }
  };

  useEffect(() => {
    // Load thông tin người dùng
    loadUserInfo();
  }, []);

  return (
    <>
      {loading && <Preloader />}
      {children}
    </>
  );
}

export default RequireAuth;
