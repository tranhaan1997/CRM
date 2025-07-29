import apiClient from '~/apis/apiClient'

// Operators API service
export const operatorsAPI = {
  // GET thông tin người dùng
  info_Me: async () => {
    var result= await apiClient.get("Systems/Opperators/Me")   
    return result?.data
  },

  // GET danh sách người dùng
  Operators_Getlist: async () => {
    var result= await apiClient.get("Systems/Operators_Getlist")   
    return result?.data
  },

  // POST thêm thông tin tài khoản
  Operators_Insert: async (data) => {
    var result= await apiClient.post("Systems/Operators_Insert", data)
    return result?.data
  },

  // POST cập nhật thông tin tài khoản
  Operators_Update: async (data) => {
    var result= await apiClient.post("Systems/Operators_Update", data)
    return result?.data
  },
  
  // POST xóa tài khoản
  Operators_Delete: async (data) => {
    var result= await apiClient.post("Systems/Operators_Delete", data)
    return result?.data
  }
}
