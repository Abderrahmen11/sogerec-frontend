import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRoleAccess from '../hooks/useRoleAccess';
import DashboardClient from '../components/dashboard/DashboardClient';
import DashboardTechnicien from '../components/dashboard/DashboardTechnicien';
import DashboardAdmin from '../components/dashboard/DashboardAdmin';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const { isAdmin, isTechnician, isClient, userRole } = useRoleAccess();

    if (loading) return <div className="text-center p-5">Loading dashboard...</div>;

    // Determine role-specific content
    const getHeroContent = () => {
        if (isAdmin()) {
            return {
                title: `Welcome, ${user?.name}!`,
                subtitle: 'Administration & System Control',
                description: 'Monitor operations, manage technicians & optimize maintenance workflow.',
                primaryButton: { text: 'Manage Users', link: '/users' },
                secondaryButton: { text: 'View Reports', link: '/reports' }
            };
        } else if (isTechnician()) {
            return {
                title: `Welcome, ${user?.name}!`,
                subtitle: 'Technician Dashboard',
                description: 'Manage your assigned interventions and track your performance.',
                primaryButton: { text: 'My Interventions', link: '/interventions' },
                secondaryButton: { text: 'View Tickets', link: '/tickets' }
            };
        } else {
            return {
                title: `Welcome, ${user?.name}!`,
                subtitle: 'Client Portal',
                description: 'Submit maintenance requests, track interventions in real-time, and manage your facility needs efficiently.',
                primaryButton: { text: 'Create New Request', link: '/create-ticket' },
                secondaryButton: { text: 'View My Tickets', link: '/tickets' }
            };
        }
    };

    const heroContent = getHeroContent();

    // Render the appropriate dashboard based on role
    const renderDashboard = () => {
        if (isAdmin()) {
            return <DashboardAdmin />;
        } else if (isTechnician()) {
            return <DashboardTechnicien />;
        } else if (isClient()) {
            return <DashboardClient />;
        }
        return <div className="container mt-5"><p>No dashboard available for your role: {userRole}</p></div>;
    };

    return (
        <>
            {/* DYNAMIC HERO SECTION */}
            <section className="hero-section d-flex justify-content-center align-items-center" id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            <h1 className="text-white">{heroContent.title}</h1>
                            <h6 className="text-light mb-2">{heroContent.subtitle}</h6>
                            <p className="text-light">{heroContent.description}</p>
                            <div className="mt-4">
                                <Link
                                    to={heroContent.primaryButton.link}
                                    className="btn custom-btn me-2"
                                    style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff' }}
                                >
                                    {heroContent.primaryButton.text}
                                </Link>
                                <Link
                                    to={heroContent.secondaryButton.link}
                                    className="btn btn-outline-light"
                                >
                                    {heroContent.secondaryButton.text}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROLE-BASED DASHBOARD CONTENT */}
            {renderDashboard()}
        </>
    );
};

export default Dashboard;
