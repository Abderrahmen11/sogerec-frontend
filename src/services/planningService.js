import api from "./api";

const planningService = {
  getAll: async (params = {}) => {
    const response = await api.get("/planning", { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/planning/${id}`);
    return response.data;
  },
  getMyPlanning: async (params = {}) => {
    const response = await api.get("/planning/technician/me", { params });
    return response.data;
  },
};

export default planningService;
