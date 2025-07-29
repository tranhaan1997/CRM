import apiClient from '~/apis/apiClient'

// Permissions API service
export const permissionsAPI = {
  // GET Permissions - Lấy danh sách tất cả Permissions user
  permissions_Me: async () => {
    var result = await apiClient.get("Systems/Permissions/Me")
    return result?.data
  },

  // GET danh sách Permissions
  Permissions_Getlist: async () => {
    var result = await apiClient.get("Systems/Permissions_Getlist")
    return result?.data
  },

  // POST thêm thông tin Permissions
  Permissions_Insert: async (data) => {
    var result = await apiClient.post("Systems/Permissions_Insert", data)
    return result?.data
  },

  // POST cập nhật thông tin Permissions
  Permissions_Update: async (data) => {
    var result = await apiClient.post("Systems/Permissions_Update", data)
    return result?.data
  },

  // POST xóa Permissions
  Permissions_Delete: async (data) => {
    var result = await apiClient.post("Systems/Permissions_Delete", data)
    return result?.data
  },
};