import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center min-vh-100"><div className="spinner-border"></div></div>;
    }

    // Rely on user existence (Sanctum session) instead of token
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

