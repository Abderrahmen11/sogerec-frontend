import React from 'react';
import { Navigate } from 'react-router-dom';
import useRoleAccess from '../hooks/useRoleAccess';

const RoleRedirect = ({ requiredRoles, redirectTo }) => {
    const { hasRole } = useRoleAccess();

    if (hasRole(requiredRoles)) {
        return null; // Allow navigation
    }

    return <Navigate to={redirectTo || '/dashboard'} />;
};

export default RoleRedirect;

