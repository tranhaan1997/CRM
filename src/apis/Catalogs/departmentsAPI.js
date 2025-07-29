import apiClient from '~/apis/apiClient'

// department API service
export const departmentsAPI = {
  // GET /departments - Lấy danh sách tất cả departments
  Departments_Getlist: async () => {

    var result= await apiClient.get("Catalogs/Departments_Getlist")   
    return result?.data
  },

  // POST /departments - Tạo department mới
  Departments_Insert: async (data) => {
    var result= await apiClient.post("Catalogs/Departments_Insert", data)
    return result?.data
  },

  // POST /departments/:id - Cập nhật department
  Departments_Update: async (data) => {
    var result= await apiClient.post("Catalogs/Departments_Update", data)
    return result?.data
  },

  // POST /departments/:id - Xóa department
  Departments_Delete: async (data) => {
    var result= await apiClient.post("Catalogs/Departments_Delete",data)
    return result?.data
  },
}