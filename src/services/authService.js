import api from "./api";

const authService = {
  // Get CSRF token from Sanctum before login
  getCsrfToken: async () => {
    try {
      await api.post("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("CSRF cookie error:", error);
    }
  },

  // Login with Sanctum session-based auth
  login: async (email, password) => {
    try {
      // First, get CSRF token
      await authService.getCsrfToken();

      // Then attempt login
      const response = await api.post("/login", { email, password });

      // Store only user data in localStorage, not token
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear user data from localStorage
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!authService.getCurrentUser(),

  resetPassword: async (email) => {
    const response = await api.post("/password-reset", { email });
    return response.data;
  },

  verifyToken: async (token) => {
    const response = await api.post("/verify-token", { token });
    return response.data;
  },
};

export default authService;
