
import apiClient from '~/apis/apiClient'

// Status API service
export const statusAPI = {
  // GET /Status - Lấy danh sách tất cả Status
  Status_Getlist: async () => {

    var result= await apiClient.get("Systems/Status_Getlist")   
    return result?.data
  },
}
