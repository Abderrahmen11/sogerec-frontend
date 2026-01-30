import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import AnimatedNumber from '../common/AnimatedNumber';
import useInterventions from '../../hooks/useInterventions';
import { Assignment, Autorenew, CheckCircle, TrendingUp } from '@mui/icons-material';
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
            <header className="hero-section d-flex justify-content-center align-items-center" id="home"
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/tech.jpg') center/cover no-repeat`,
                    minHeight: '300px'
                }}>
                <div className="container text-center">
                    <h2 className="text-white mb-3">Technician Dashboard</h2>
                    <p className="text-white">Welcome back, {user?.name}</p>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className="row g-4 mb-4">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-start border-5 border-primary">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h6 className="mb-0 text-muted">Assigned</h6>
                                    <div className="badge bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                                        <Assignment />
                                    </div>
                                </div>
                                <h3 className="fw-bold mb-0">
                                    <AnimatedNumber value={assignedCount} />
                                </h3>
                                <p className="text-muted small mb-0 mt-2">Total assigned tasks</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-start border-5 border-warning">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h6 className="mb-0 text-muted">In Progress</h6>
                                    <div className="badge bg-warning bg-opacity-10 text-warning rounded-circle p-2">
                                        <Autorenew />
                                    </div>
                                </div>
                                <h3 className="fw-bold mb-0">
                                    <AnimatedNumber value={inProgressCount} />
                                </h3>
                                <p className="text-muted small mb-0 mt-2">Currently active</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-start border-5 border-success">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h6 className="mb-0 text-muted">Completed</h6>
                                    <div className="badge bg-success bg-opacity-10 text-success rounded-circle p-2">
                                        <CheckCircle />
                                    </div>
                                </div>
                                <h3 className="fw-bold mb-0">
                                    <AnimatedNumber value={completedCount} />
                                </h3>
                                <p className="text-muted small mb-0 mt-2">Finished tasks</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-start border-5 border-info">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h6 className="mb-0 text-muted">Success Rate</h6>
                                    <div className="badge bg-info bg-opacity-10 text-info rounded-circle p-2">
                                        <TrendingUp />
                                    </div>
                                </div>
                                <h3 className="fw-bold mb-0">
                                    <AnimatedNumber value={completionRate} />%
                                </h3>
                                <p className="text-muted small mb-0 mt-2">Completion efficiency</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="custom-block bg-white shadow-lg p-4 border-0">
                                <h5 className="mb-4 fw-bold">Recent Interventions</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0 mobile-responsive-table">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="border-0">ID</th>
                                                <th className="border-0">Status</th>
                                                <th className="border-0">Client</th>
                                                <th className="border-0">Ticket</th>
                                                <th className="border-0 text-end">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myInterventions.length > 0 ? (
                                                myInterventions.slice(0, 10).map(intervention => (
                                                    <tr key={intervention.id}>
                                                        <td data-label="ID" className="fw-bold">#{intervention.id}</td>
                                                        <td data-label="Status">
                                                            <span className={`badge px-3 rounded-pill bg-${intervention.status === 'completed' ? 'success' : intervention.status === 'in_progress' ? 'warning' : 'primary'}`} style={{ textTransform: 'capitalize' }}>
                                                                {intervention.status?.replace('_', ' ')}
                                                            </span>
                                                        </td>
                                                        <td data-label="Client" className="text-muted">{intervention.ticket?.user?.name || 'N/A'}</td>
                                                        <td data-label="Ticket" style={{ minWidth: '200px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                                            {intervention.ticket?.title || 'N/A'}
                                                        </td>
                                                        <td data-label="Date" className="text-end text-muted small">{intervention.scheduled_at ? new Date(intervention.scheduled_at).toLocaleDateString() : '-'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="5" className="text-center py-4">No interventions found</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {myInterventions.length > 0 ? (
                            myInterventions.map(intervention => (
                                <div key={intervention.id} className="col-lg-4 col-md-6 col-12 mb-4">
                                    <div className="custom-block bg-white shadow-lg dashboard-card h-100">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className={`badge bg-${intervention.status === 'completed' ? 'success' : intervention.status === 'in_progress' ? 'warning' : 'primary'} ticket-status-badge`} style={{ textTransform: 'capitalize' }}>
                                                {intervention.status?.replace('_', ' ')}
                                            </span>
                                            <span className="text-muted small">#{intervention.id}</span>
                                        </div>
                                        <h5 className="mb-3">{intervention.title}</h5>
                                        <p className="mb-2"><strong>Ticket:</strong> {intervention.ticket?.title || 'N/A'}</p>
                                        <p className="mb-2"><strong>Location:</strong> {intervention.location || 'N/A'}</p>
                                        <div className="mt-auto pt-3 border-top">
                                            <div className="d-flex gap-2 flex-wrap">
                                                <button onClick={() => handleStatusUpdate(intervention.id, 'in_progress')} className="btn btn-warning btn-sm" disabled={intervention.status !== 'pending'}>Start</button>
                                                <button onClick={() => handleStatusUpdate(intervention.id, 'completed')} className="btn btn-success btn-sm" disabled={intervention.status === 'completed'}>Complete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardTechnicien;
