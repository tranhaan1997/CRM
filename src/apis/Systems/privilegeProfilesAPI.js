import apiClient from '~/apis/apiClient'

export const privilegeProfilesAPI = {
  // GET danh sách đã/chưa phân quyền
  PrivilegeProfile_GetPrid: async (id) => {
    var result = await apiClient.get(`Systems/PrivilegeProfile_GetPrid/${idpr}/${id}`)
    return result?.data
  },

  // POST thêm thông tin quyền vào nhóm
  PrivilegeProfile_Insert: async (data) => {
    var result = await apiClient.post("Systems/PrivilegeProfile_Insert", data)
    return result?.data
  },

  // POST xóa thông tin cấp quyền vào nhóm
  PrivilegeProfile_Delete: async (data) => {
    var result = await apiClient.post("Systems/PrivilegeProfile_Delete", data)
    return result?.data
  }
};