import apiClient from '~/apis/apiClient'

// province API service
export const provinceAPI = {
  // GET /provinces - Lấy danh sách tất cả provinces
  Province_Getlist: async () => {

    var result= await apiClient.get("Catalogs/Province_Getlist")   
    return result?.data
  },

  // POST /provinces - Tạo province mới
  Province_Insert: async (data) => {
    var result= await apiClient.post("Catalogs/Province_Insert", data)
    return result?.data
  },

  // POST /provinces/:id - Cập nhật province
  Province_Update: async (data) => {
    var result= await apiClient.post("Catalogs/Province_Update", data)
    return result?.data
  },

  // POST /provinces/:id - Xóa province
  Province_Delete: async (data) => {
    var result= await apiClient.post("Catalogs/Province_Delete",data)
    return result?.data
  },
}
