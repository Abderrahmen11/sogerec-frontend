import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add CSRF token from cookie to request headers
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (token) {
    config.headers["X-CSRF-TOKEN"] = decodeURIComponent(token);
  }

  return config;
});

// Handle response errors - let AuthContext handle 401s via login verification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-redirect on 401 - let components/contexts handle it
    // This prevents unexpected redirects during initial auth check
    return Promise.reject(error);
  }
);

export default api;
