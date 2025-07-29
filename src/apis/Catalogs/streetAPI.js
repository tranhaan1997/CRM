import apiClient from '~/apis/apiClient'

// Street API service
export const streetAPI = {
  // GET /streets - Lấy danh sách tất cả streets
  Street_Getlist: async () => {
    var result = await apiClient.get("Catalogs/Street_Getlist")
    return result?.data
  },

  // GET /streets/:id - Lấy thông tin street theo ID
  Street_GetById: async (id) => {
    var result = await apiClient.get(`Catalogs/Street_GetById/${id}`)
    return result?.data
  },

  // POST /streets - Tạo street mới
  Street_Insert: async (data) => {
    var result = await apiClient.post("Catalogs/Street_Insert", data)
    return result?.data
  },

  // POST /streets/:id - Cập nhật street
  Street_Update: async (data) => {
    var result = await apiClient.post("Catalogs/Street_Update", data)
    return result?.data
  },

  // POST /streets/:id - Xóa street
  Street_Delete: async (data) => {
    var result = await apiClient.post("Catalogs/Street_Delete", data)
    return result?.data
  },
}