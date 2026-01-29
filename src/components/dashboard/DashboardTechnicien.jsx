```javascript
import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import AnimatedNumber from '../common/AnimatedNumber';
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
                    background: `linear - gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/tech.jpg') center / cover no - repeat`,
                    minHeight: '300px'
                }}>
                <div className="container text-center">
                    <h2 className="text-white mb-3">Technician Dashboard</h2>
                    <p className="text-white">Welcome back, {user?.name}</p>
                </div>
            </header>

            {/* TECHNICIAN STATS */}
            <section className="section-padding">
                <div className="container">
                    <div className="stats-block shadow-lg" style={{ background: 'linear-gradient(120deg, #0d6efd 60%, #198754 100%)', color: '#fff', borderRadius: '16px', padding: '24px 0', marginBottom: '24px' }}>
                        <div className="row">
                            <div className="col-md-3 col-6 text-center">
                                <p className="display-6 fw-bold mb-0">
                                    <AnimatedNumber value={assignedCount} />
                                </p>
                                <p>Assigned Interventions</p>
                            </div>
                            <div className="col-md-3 col-6 text-center">
                                <p className="display-6 fw-bold mb-0">
                                    <AnimatedNumber value={inProgressCount} />
                                </p>
                                <p>In Progress</p>
                            </div>
                            <div className="col-md-3 col-6 text-center">
                                <p className="display-6 fw-bold mb-0">
                                    <AnimatedNumber value={completedCount} />
                                </p>
                                <p>Completed</p>
                            </div>
                            <div className="col-md-3 col-6 text-center">
                                <p className="display-6 fw-bold mb-0">
                                    <AnimatedNumber value={completionRate} />%
                                </p>
                                <p>Success Rate</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="custom-block bg-white shadow-lg p-4 border-0">
                                <h5 className="mb-4 fw-bold">Recent Interventions</h5>
                                <div className="table-responsive" style={{ overflowX: 'auto', overflowY: 'visible' }}>
                                    <table className="table table-hover align-middle mb-0">
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
                                                myInterventions.slice(0,10).map(intervention => (
                                                    <tr key={intervention.id}>
                                                        <td className="fw-bold">#{intervention.id}</td>
                                                        <td>
                                                            <span className={`badge px - 3 rounded - pill bg - ${ intervention.status === 'completed' ? 'success' : intervention.status === 'in_progress' ? 'warning' : 'primary' } `}>
                                                                {intervention.status?.replace('_', ' ')}
                                                            </span>
                                                        </td>
                                                        <td className="text-muted">{intervention.ticket?.user?.name || 'N/A'}</td>
                                                        <td style={{ minWidth: '200px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                                            {intervention.ticket?.title || 'N/A'}
                                                        </td>
                                                        <td className="text-end text-muted small">{intervention.scheduled_at ? new Date(intervention.scheduled_at).toLocaleDateString() : '-'}</td>
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
                                            <span className={`badge bg - ${ intervention.status === 'completed' ? 'success' : intervention.status === 'in_progress' ? 'warning' : 'primary' } ticket - status - badge`}>
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
