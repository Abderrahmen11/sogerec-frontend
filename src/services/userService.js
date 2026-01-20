import api from "./api";

const userService = {
  getAll: async (params = {}) => {
    const response = await api.get("/users", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post("/users/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  getTechnicians: async () => {
    const response = await api.get("/users?role=technician");
    return response.data;
  },
};


export default userService;
