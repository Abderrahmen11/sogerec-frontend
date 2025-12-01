import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowBack } from '@mui/icons-material';
import useAuth from '../hooks/useAuth';
import useRoleAccess from '../hooks/useRoleAccess';

const NotFound = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { isAdmin, isTechnician, isClient } = useRoleAccess();

    const handleBackClick = () => {
        if (isAuthenticated) {
            // Redirect to dashboard for authenticated users
            navigate('/dashboard', { replace: true });
        } else {
            // Redirect to home for unauthenticated users
            navigate('/', { replace: true });
        }
    };

    const getDashboardMessage = () => {
        if (!isAuthenticated) return 'Back to Home';
        if (isAdmin()) return 'Back to Admin Dashboard';
        if (isTechnician()) return 'Back to Technician Dashboard';
        if (isClient()) return 'Back to Client Dashboard';
        return 'Back to Dashboard';
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="text-center">
                <div className="mb-4">
                    <h1 className="display-1 fw-bold" style={{ color: 'var(--primary-color)', fontSize: '8rem' }}>
                        404
                    </h1>
                </div>
                <h2 className="mb-3">Page Not Found</h2>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                    The page you're looking for doesn't exist or you don't have permission to access it.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                    <button
                        onClick={handleBackClick}
                        className="btn btn-primary d-flex align-items-center gap-2"
                        style={{ backgroundColor: '#004598', borderColor: '#004598' }}
                    >
                        <ArrowBack />
                        {getDashboardMessage()}
                    </button>
                    {isAuthenticated && (
                        <button
                            onClick={() => navigate('/', { replace: true })}
                            className="btn btn-outline-primary d-flex align-items-center gap-2"
                        >
                            <Home />
                            Home
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
