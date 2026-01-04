import React, { useEffect } from 'react';
import { CalendarToday, AccessTime } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import useTickets from '../../hooks/useTickets';
import useInterventions from '../../hooks/useInterventions';
import './DashboardStyles.css';

const DashboardTechnicien = () => {
    const { user } = useAuth();
    const { interventions, fetchInterventions, updateInterventionStatus } = useInterventions();

    useEffect(() => {
        fetchInterventions();
    }, [fetchInterventions]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateInterventionStatus(id, newStatus);
            // Instant update handled by context
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status. Please try again.");
        }
    };

    // Calculate stats based on interventions
    const myInterventions = interventions || [];
    const assignedCount = myInterventions.length;
    const inProgressCount = myInterventions.filter(i => i.status === 'in_progress').length;
    const completedCount = myInterventions.filter(i => i.status === 'completed').length;
    const completionRate = assignedCount > 0 ? Math.round((completedCount / assignedCount) * 100) : 0;

    return (
        <div id="technician-dashboard">
            {/* ... hero section omitted for brevity but I'll keep it in the real file ... */}
            <section className="hero-section d-flex justify-content-center align-items-center" id="home"
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/tech.jpg') center/cover no-repeat`,
                    minHeight: '300px'
                }}>
                <div className="container text-center">
                    <h2 className="text-white mb-3">Technician Dashboard</h2>
                    <p className="text-white">Welcome back, {user?.name}</p>
                </div>
            </section>

            {/* TECHNICIAN STATS */}
            <section className="section-padding">
                <div className="container">
                    <div className="stats-block shadow-lg" style={{ background: 'linear-gradient(120deg, #0d6efd 60%, #198754 100%)', color: '#fff', borderRadius: '16px', padding: '24px 0', marginBottom: '24px' }}>
                        <div className="row">
                            <div className="col-md-3 col-6 text-center">
                                <h4>{assignedCount}</h4>
                                <p>Assigned Interventions</p>
                            </div>
                            <div className="col-md-3 col-6 text-center">
                                <h4>{inProgressCount}</h4>
                                <p>In Progress</p>
                            </div>
                            <div className="col-md-3 col-6 text-center">
                                <h4>{completedCount}</h4>
                                <p>Completed</p>
                            </div>
                            <div className="col-md-3 col-6 text-center">
                                <h4>{completionRate}%</h4>
                                <p>Success Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ASSIGNED INTERVENTIONS SECTION */}
            <section className="section-padding" id="assigned-interventions">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <h2>Your Interventions</h2>
                            <p>Manage your assigned maintenance tasks and update their status</p>
                        </div>
                    </div>

                    <div className="row">
                        {myInterventions.length > 0 ? (
                            myInterventions.map(intervention => (
                                <div key={intervention.id} className="col-lg-4 col-md-6 col-12 mb-4">
                                    <div className="custom-block bg-white shadow-lg dashboard-card h-100">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className={`badge bg-${intervention.status === 'completed' ? 'success' : intervention.status === 'in_progress' ? 'warning' : 'primary'} ticket-status-badge`}>
                                                {intervention.status?.replace('_', ' ')}
                                            </span>
                                            <span className="text-muted small">#{intervention.id}</span>
                                        </div>
                                        <h5 className="mb-3">{intervention.title}</h5>
                                        <p className="mb-2"><strong>Ticket:</strong> {intervention.ticket?.title || 'N/A'}</p>
                                        <p className="mb-2"><strong>Location:</strong> {intervention.location || 'N/A'}</p>
                                        <p className="mb-3"><strong>Scheduled:</strong> {intervention.scheduled_at ? new Date(intervention.scheduled_at).toLocaleString() : 'Not set'}</p>

                                        <div className="mt-auto">
                                            <p className="mb-2 small fw-bold text-muted">Update Status:</p>
                                            <div className="d-flex gap-1 flex-wrap">
                                                <button
                                                    onClick={() => handleStatusUpdate(intervention.id, 'pending')}
                                                    className={`btn btn-sm ${intervention.status === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                    disabled={intervention.status === 'completed'}
                                                >
                                                    Pending
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(intervention.id, 'in_progress')}
                                                    className={`btn btn-sm ${intervention.status === 'in_progress' ? 'btn-warning' : 'btn-outline-warning'}`}
                                                    disabled={intervention.status === 'completed'}
                                                >
                                                    In Progress
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(intervention.id, 'completed')}
                                                    className={`btn btn-sm ${intervention.status === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
                                                >
                                                    Completed
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center"><p className="text-muted">No assigned interventions found.</p></div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardTechnicien;
