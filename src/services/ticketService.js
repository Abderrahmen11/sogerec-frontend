import api from "./api";

const ticketService = {
  getAll: async (params = {}) => {
    const response = await api.get("/tickets", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },

  create: async (ticketData) => {
    const response = await api.post("/tickets", ticketData);
    return response.data;
  },

  update: async (id, ticketData) => {
    const response = await api.put(`/tickets/${id}`, ticketData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/tickets/${id}/status`, { status });
    return response.data;
  },

  addComment: async (id, comment) => {
    const response = await api.post(`/tickets/${id}/comments`, { comment });
    return response.data;
  },

  search: async (query) => {
    const response = await api.get(`/tickets/search?q=${query}`);
    return response.data;
  },
};

export default ticketService;
