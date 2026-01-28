import api from "./api";

const authService = {
  // Login with Sanctum token-based auth
  login: async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });

      // Step 2: Store user data and token
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);

      // Store user data and token if returned
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => !!authService.getToken(),

  resetPassword: async (email) => {
    const response = await api.post("/password-reset", { email });
    return response.data;
  },
};

export default authService;
