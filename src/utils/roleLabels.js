export const ROLE_LABELS = {
  admin: "Administrator",
  technician: "Technician",
  client: "Client",
};

export function getRoleLabel(role) {
  return ROLE_LABELS[role] || role;
}

export const STATUS_COLORS = {
  open: "#007bff",
  pending: "#ffc107",
  in_progress: "#17a2b8",
  resolved: "#28a745",
  closed: "#6c757d",
  scheduled: "#007bff",
  completed: "#28a745",
  cancelled: "#dc3545",
};

export function getStatusColor(status) {
  return STATUS_COLORS[status] || "#6c757d";
}
