import axios from "axios";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response Interceptor untuk pemrosesan error yang konsisten
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customErrorMessage =
      error.response?.data?.message ||
      error.message ||
      "Terjadi kesalahan saat menghubungi server.";
    return Promise.reject(new Error(customErrorMessage));
  }
);

export default api;
