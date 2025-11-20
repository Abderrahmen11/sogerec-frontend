export const TICKET_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
  PENDING: "pending",
};

export const TICKET_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};

export const INTERVENTION_STATUS = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const USER_ROLES = {
  ADMIN: "admin",
  TECHNICIAN: "technician",
  CLIENT: "client",
};

export const NOTIFICATION_TYPES = {
  TICKET_CREATED: "ticket_created",
  TICKET_UPDATED: "ticket_updated",
  INTERVENTION_SCHEDULED: "intervention_scheduled",
  INTERVENTION_COMPLETED: "intervention_completed",
  MESSAGE: "message",
};

export const API_ROUTES = {
  AUTH: "/auth",
  TICKETS: "/tickets",
  INTERVENTIONS: "/interventions",
  USERS: "/users",
  NOTIFICATIONS: "/notifications",
};
