import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useRoleAccess from '../hooks/useRoleAccess';
import DashboardClient from '../components/dashboard/DashboardClient';
import DashboardTechnicien from '../components/dashboard/DashboardTechnicien';
import DashboardAdmin from '../components/dashboard/DashboardAdmin';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const { isAdmin, isTechnician, isClient } = useRoleAccess();

    if (loading) return <div className="text-center p-5">Loading dashboard...</div>;

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Welcome, {user?.name}!</h1>
                </div>
            </div>
            {isAdmin() && <DashboardAdmin />}
            {isTechnician() && <DashboardTechnicien />}
            {isClient() && <DashboardClient />}
        </div>
    );
};

export default Dashboard;

