import useAuth from "./useAuth";

export default function useRoleAccess() {
  const { user } = useAuth();

  const hasRole = (requiredRoles) => {
    if (!user) return false;
    if (typeof requiredRoles === "string") {
      return user.role === requiredRoles;
    }
    return requiredRoles.includes(user.role);
  };

  const isAdmin = () => hasRole("admin");
  const isTechnician = () => hasRole("technician");
  const isClient = () => hasRole(["client", "user"]); // Accept both 'client' and 'user' roles

  return {
    hasRole,
    isAdmin,
    isTechnician,
    isClient,
    userRole: user?.role,
  };
}
