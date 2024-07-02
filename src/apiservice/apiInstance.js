import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

apiInstance.interceptors.request.use((config) => {
  try {
    const token = JSON.parse(localStorage.getItem("webToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export default apiInstance;
