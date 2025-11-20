import api from "./api";

const interventionService = {
  getAll: async (params = {}) => {
    const response = await api.get("/interventions", { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/interventions/${id}`);
    return response.data;
  },
  create: async (interventionData) => {
    const response = await api.post("/interventions", interventionData);
    return response.data;
  },
  update: async (id, interventionData) => {
    const response = await api.put(`/interventions/${id}`, interventionData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/interventions/${id}`);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/interventions/${id}/status`, { status });
    return response.data;
  },
  submitReport: async (id, reportData) => {
    const response = await api.post(`/interventions/${id}/report`, reportData);
    return response.data;
  },
  getPlanning: async (params = {}) => {
    const response = await api.get("/interventions/planning", { params });
    return response.data;
  },
};

export default interventionService;
