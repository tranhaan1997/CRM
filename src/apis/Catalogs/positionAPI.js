import apiClient from '~/apis/apiClient'

// position API service
export const positionAPI = {
  // GET /positions - Lấy danh sách tất cả positions
  Position_Getlist: async () => {

    var result= await apiClient.get("Catalogs/Position_Getlist")   
    return result?.data
  },

  // POST /positions - Tạo position mới
  Position_Insert: async (data) => {
    var result= await apiClient.post("Catalogs/Position_Insert", data)
    return result?.data
  },

  // POST /positions/:id - Cập nhật position
  Position_Update: async (data) => {
    var result= await apiClient.post("Catalogs/Position_Update", data)
    return result?.data
  },

  // POST /positions/:id - Xóa position
  Position_Delete: async (data) => {
    var result= await apiClient.post("Catalogs/Position_Delete",data)
    return result?.data
  },
}
