import apiClient from "~/apis/apiClient";

// local API local
export const agentLocalAPI = {
  // GET /local - Lấy danh sách tất cả streets
  AgentLocal_Getlist: async () => {
    var result = await apiClient.get("Catalogs/AgentLocal_Getlist");
    return result?.data;
  },
};
