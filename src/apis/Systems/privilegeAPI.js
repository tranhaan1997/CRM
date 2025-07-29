import apiClient from '~/apis/apiClient'

export const privilegeAPI = {
  // GET danh sách Privilege
  Privilege_Getlist: async () => {
    var result = await apiClient.get("System/Privilege_Getlist")
    return result?.data
  },

  // POST thêm thông tin Privilege
  Privilege_Insert: async (data) => {
    var result = await apiClient.post("System/Privilege_Insert", data)
    return result?.data
  },

  // POST cập nhật thông tin Privilege
  Privilege_Update: async (data) => {
    var result = await apiClient.post("System/Privilege_Update", data)
    return result?.data
  },

  // POST xóa thông tin Privilege
  Privilege_Delete: async (data) => {
    var result = await apiClient.post("System/Privilege_Delete", data)
    return result?.data
  }
};