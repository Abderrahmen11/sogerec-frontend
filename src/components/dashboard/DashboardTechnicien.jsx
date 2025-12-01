import React, { useEffect } from 'react';
import { CalendarToday, AccessTime } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import useTickets from '../../hooks/useTickets';
import useInterventions from '../../hooks/useInterventions';
import './DashboardStyles.css';

const DashboardTechnicien = () => {
    const { user } = useAuth();
    const { tickets, fetchTickets } = useTickets();
    const { interventions, fetchInterventions } = useInterventions();

    useEffect(() => {
        fetchTickets();
        fetchInterventions();
    }, [fetchTickets, fetchInterventions]);

    // Calculate stats
    const myTickets = tickets || [];
    const assignedCount = myTickets.length;
    const inProgressCount = myTickets.filter(t => t.status === 'in_progress').length;
    const completedCount = myTickets.filter(t => t.status === 'resolved' || t.status === 'closed').length;
    const completionRate = assignedCount > 0 ? Math.round((completedCount / assignedCount) * 100) : 0;

    return (
        <div id="technician-dashboard">
            {/* DASHBOARD HEADER */}
            <section className="hero-section d-flex justify-content-center align-items-center" id="home"
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/tech.jpg') center/cover no-repeat`,
                    minHeight: '300px'
                }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            <h2 className="text-white mb-3">Technician Dashboard</h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICIAN STATS */}
            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="stats-block shadow-lg" style={{ background: 'linear-gradient(120deg, #0d6efd 60%, #ffc107 100%)', color: '#fff', borderRadius: '16px', padding: '24px 0', marginBottom: '24px' }}>
                                <div className="row">
                                    <div className="col-md-3 col-6 text-center mb-3 mb-md-0">
                                        <h4>{assignedCount}</h4>
                                        <p>Assigned Tasks</p>
                                    </div>
                                    <div className="col-md-3 col-6 text-center mb-3 mb-md-0">
                                        <h4>{inProgressCount}</h4>
                                        <p>In Progress</p>
                                    </div>
                                    <div className="col-md-3 col-6 text-center">
                                        <h4>{completedCount}</h4>
                                        <p>Completed Today</p>
                                    </div>
                                    <div className="col-md-3 col-6 text-center">
                                        <h4>{completionRate}%</h4>
                                        <p>Completion Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ASSIGNED TICKETS SECTION */}
            <section className="section-padding" id="assigned-tickets">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <h2>Assigned Tickets</h2>
                            <p>Your currently assigned maintenance tickets</p>
                        </div>
                    </div>

                    <div className="row">
                        {myTickets.length > 0 ? (
                            myTickets.slice(0, 3).map(ticket => (
                                <div key={ticket.id} className="col-lg-4 col-md-6 col-12 mb-4">
                                    <div className="custom-block bg-white shadow-lg dashboard-card">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className={`badge bg-${ticket.status === 'open' ? 'warning' : ticket.status === 'in_progress' ? 'primary' : 'success'} ticket-status-badge`}>
                                                {ticket.status}
                                            </span>
                                            <span className="text-muted small">#{ticket.id}</span>
                                        </div>
                                        <h5 className="mb-3">{ticket.title}</h5>
                                        <p className="mb-2"><strong>Client:</strong> {ticket.user?.name || 'Unknown'}</p>
                                        <p className="mb-2"><strong>Location:</strong> {ticket.location || 'N/A'}</p>
                                        <p className="mb-3"><strong>Priority:</strong> <span className={`text-${ticket.priority === 'high' ? 'danger' : ticket.priority === 'medium' ? 'warning' : 'success'}`}>{ticket.priority}</span></p>

                                        <div className="progress mb-3">
                                            <div className="progress-bar" role="progressbar"
                                                style={{ width: ticket.status === 'resolved' ? '100%' : ticket.status === 'in_progress' ? '50%' : '0%' }}
                                                aria-valuenow={ticket.status === 'resolved' ? 100 : ticket.status === 'in_progress' ? 50 : 0}
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-sm btn-outline-secondary" disabled>
                                                <CalendarToday sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} /> {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'Not Scheduled'}
                                            </button>
                                            <button className="btn btn-sm btn-warning">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12"><p>No assigned tickets found.</p></div>
                        )}
                    </div>
                </div>
            </section>

            {/* INTERVENTION WORKFLOW SECTION */}
            <section className="section-padding section-bg" id="interventions">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <h2>Intervention Workflow</h2>
                            <p>Follow the standard process for handling interventions</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-10 col-12 mx-auto">
                            <div className="intervention-timeline timeline">
                                <div className="timeline-step">
                                    <h5>1. Receive Assignment</h5>
                                    <p>Ticket is assigned to you by admin. Check details and requirements.</p>
                                </div>

                                <div className="timeline-step">
                                    <h5>2. Schedule Intervention</h5>
                                    <p>Plan your visit according to priority and availability.</p>
                                </div>

                                <div className="timeline-step">
                                    <h5>3. Start Intervention</h5>
                                    <p>Begin working on the task and update the status.</p>
                                </div>

                                <div className="timeline-step">
                                    <h5>4. Update Progress</h5>
                                    <p>Regularly update notes and status as you work.</p>
                                </div>

                                <div className="timeline-step">
                                    <h5>5. Complete Intervention</h5>
                                    <p>Mark as completed when all work is done.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCHEDULE SECTION */}
            <section className="section-padding" id="schedule">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <h2>Your Schedule</h2>
                            <p>Upcoming interventions and tasks</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-12 mb-4">
                            <div className="custom-block bg-white shadow-lg p-4">
                                <h5 className="mb-4">Upcoming Interventions</h5>
                                {interventions && interventions.length > 0 ? (
                                    interventions.slice(0, 3).map(intervention => (
                                        <div key={intervention.id} className="d-flex border-bottom pb-3 mb-3">
                                            <div className="me-3">
                                                <AccessTime className="text-primary" />
                                            </div>
                                            <div>
                                                <h6 className="mb-1">Intervention #{intervention.id}</h6>
                                                <p className="mb-1">{intervention.location || 'Location N/A'}</p>
                                                <span className="badge bg-light text-dark">
                                                    {intervention.start_date ? new Date(intervention.start_date).toLocaleString() : 'Not scheduled'}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No upcoming interventions.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardTechnicien;
