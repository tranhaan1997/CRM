import apiClient from '~/apis/apiClient'

// Ward API service
export const wardAPI = {
  // GET /wards - Lấy danh sách tất cả wards
  Ward_Getlist: async () => {

    var result= await apiClient.get("Catalogs/Ward_Getlist")   
    return result?.data
  },

  // POST /wards - Tạo ward mới
  Ward_Insert: async (data) => {
    var result= await apiClient.post("Catalogs/Ward_Insert", data)
    return result?.data
  },

  // POST /wards/:id - Cập nhật ward
  Ward_Update: async (data) => {
    var result= await apiClient.post("Catalogs/Ward_Update", data)
    return result?.data
  },

  // POST /wards/:id - Xóa ward
  Ward_Delete: async (data) => {
    var result= await apiClient.post("Catalogs/Ward_Delete",data)
    return result?.data
  },
}