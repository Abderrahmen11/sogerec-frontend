import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, roles = [] }) => {
    const { isAuthenticated, loading, user } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Normalize user role ('user' should be treated as 'client')
    const userRole = user?.role === 'user' ? 'client' : user?.role;

    // If roles are specified, check if user has required role
    if (roles.length > 0 && userRole && !roles.includes(userRole)) {
        // User doesn't have permission - redirect to their dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // If authenticated and authorized (or no specific roles required), render children
    return children;
};

export default PrivateRoute;
