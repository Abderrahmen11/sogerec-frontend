import axios from "axios";

// Create a separate axios instance for CSRF and auth endpoints
const authApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Create API instance for authenticated endpoints
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add CSRF token to authenticated requests
apiClient.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (token) {
    config.headers["X-CSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

const authService = {
  // Get CSRF token from Sanctum before any auth operations
  getCsrfToken: async () => {
    try {
      // Call CSRF endpoint to initialize session and get CSRF token
      await authApi.get("/sanctum/csrf-cookie");
      console.log("CSRF token obtained successfully");
      return true;
    } catch (error) {
      console.error("CSRF cookie error:", error);
      return false;
    }
  },

  // Get authenticated user from server (verifies session/cookies)
  getAuthenticatedUser: async () => {
    try {
      const response = await apiClient.get("/user");
      if (response?.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }
      return null;
    } catch (error) {
      // If 401, clear stored user and return null
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        return null;
      }
      throw error;
    }
  },

  // Login with Sanctum session-based auth
  login: async (email, password) => {
    try {
      // Step 1: Get CSRF token
      await authService.getCsrfToken();

      // Step 2: Attempt login
      const response = await apiClient.post("/login", { email, password });

      // Step 3: Store user data
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      localStorage.removeItem("user");
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      // Get CSRF token first
      await authService.getCsrfToken();
      const response = await apiClient.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!authService.getCurrentUser(),

  resetPassword: async (email) => {
    await authService.getCsrfToken();
    const response = await apiClient.post("/password-reset", { email });
    return response.data;
  },

  verifyToken: async (token) => {
    const response = await apiClient.post("/verify-token", { token });
    return response.data;
  },
};

export default authService;
