import axios from "axios";
import { API } from "../utils/constants";

// Tạo axios instance với cấu hình cơ bản
const apiClient = axios.create({
  baseURL: API,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - thêm token hoặc xử lý request
apiClient.interceptors.request.use(
  (config) => {
    // console.log("🚀 ~ config:", config)
    // custom nếu dùng Auth
    // config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý response và error
apiClient.interceptors.response.use(
  (response) => {
    // check dang nhap con ton tai
    //  console.log(response)
    return response;
  },
  (error) => {
    // Xử lý các lỗi phổ biến
    if (error.response?.status === 401) {
      // Unauthorized - có thể redirect đến login
      console.log("Unauthorized - redirecting to login...");
    } else if (error.response?.status === 403) {
      // Forbidden
      console.log("Access forbidden");
    } else if (error.response?.status >= 500) {
      // Server error
      console.log("Server error occurred");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
