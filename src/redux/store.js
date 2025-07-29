import { configureStore } from "@reduxjs/toolkit";

import websocketReducer from "./Wss/websocketSlice";
import operatorsReducer from "./Systems/operatorsSlice";
import permissionsReducer from "./Systems/permissionsSlice";
import streetReducer from "./Catalogs/streetSlice";
import wardReducer from "./Catalogs/wardSlice";
import departmentReducer from "./Catalogs/departmentsSlice";
import agentLocalReducer from "./Catalogs/agentLocalSlice";
import provinceReducer from "./Catalogs/provinceSlice";
import positionReducer from "./Catalogs/positionSlice";
import privilegeReducer from "./Systems/privilegeSlice";

const isProd = import.meta.env.MODE === "production";

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
    operators: operatorsReducer,
    permissions: permissionsReducer,
    street: streetReducer,
    ward: wardReducer,
    department: departmentReducer,
    agentLocal: agentLocalReducer,
    province: provinceReducer,
    position: positionReducer,
    privilege: privilegeReducer,
  },
  devTools: !isProd,
});
