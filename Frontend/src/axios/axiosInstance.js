import axios from "axios";
import  auth  from "../config/firebase";  // corrected import

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // backend base URL
});

// 🔑 Add interceptor to attach Firebase ID token automatically
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
