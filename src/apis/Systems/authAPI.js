import apiClient from '~/apis/apiClient'

// Operators API service
export const authAPI = {
  // POST /đổi code sang token
  Token: async (data) => {
    var result= await apiClient.post("Auth/Token", data)
    return result?.data
  },

  Login: async (data) => {
    var result= await apiClient.post("Auth/Login", data)
    return result?.data
  },

   Logout: async () => {
    var result= await apiClient.get("Auth/Logout")
    return result?.data
  },
}
