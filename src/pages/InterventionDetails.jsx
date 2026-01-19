import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Work, LocationOn, CalendarToday, Person, Description, Build } from '@mui/icons-material';
import useInterventions from '../hooks/useInterventions';

const InterventionDetails = () => {
    const { id } = useParams();
    const { selectedIntervention, fetchInterventionById, loading, error } = useInterventions();

    useEffect(() => {
        if (id) {
            fetchInterventionById(id);
        }
    }, [id, fetchInterventionById]);

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'planned': return '#0073b3';
            case 'in_progress': return '#1299dd';
            case 'completed': return '#198754';
            case 'cancelled': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not scheduled';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return (
        <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mt-5">
            <div className="alert alert-danger">{error}</div>
            <div className="text-center">
                <Link to="/interventions" className="btn btn-primary">Back to Interventions</Link>
            </div>
        </div>
    );

    if (!selectedIntervention) return (
        <div className="container mt-5">
            <div className="alert alert-warning">Intervention not found</div>
            <div className="text-center">
                <Link to="/interventions" className="btn btn-primary">Back to Interventions</Link>
            </div>
        </div>
    );

    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            <h2 className="text-white mb-2">Intervention Detail</h2>
                            <p className="text-light mb-4">Detailed view of the maintenance intervention and technical information.</p>
                            <div className="d-flex justify-content-center gap-3">
                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(selectedIntervention.status), fontSize: '1rem', textTransform: 'capitalize' }}>
                                    {selectedIntervention.status?.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-12 mx-auto">
                            <div className="custom-block bg-white shadow-lg p-5">
                                <div className="row">
                                    <div className="col-md-7">
                                        <h4 className="mb-4 d-flex align-items-center">
                                            <Build sx={{ mr: 2, color: '#1299dd' }} />
                                            Intervention Info
                                        </h4>

                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small mb-1">Related Ticket</h6>
                                            <h5>{selectedIntervention.ticket?.title || 'No Title'}</h5>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small mb-1">Description</h6>
                                            <p>{selectedIntervention.notes || selectedIntervention.description || 'No additional notes provided.'}</p>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6 mb-4">
                                                <h6 className="text-uppercase text-muted small mb-1">Technician</h6>
                                                <div className="d-flex align-items-center">
                                                    <Person sx={{ mr: 1, color: '#0073b3', fontSize: 20 }} />
                                                    <span>{selectedIntervention.user?.name || 'Unassigned'}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <h6 className="text-uppercase text-muted small mb-1">Client</h6>
                                                <div className="d-flex align-items-center">
                                                    <Person sx={{ mr: 1, color: '#0073b3', fontSize: 20 }} />
                                                    <span>{selectedIntervention.ticket?.user?.name || 'Unknown'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-5 border-start ps-md-5">
                                        <h4 className="mb-4 d-flex align-items-center">
                                            <CalendarToday sx={{ mr: 2, color: '#1299dd' }} />
                                            Scheduling
                                        </h4>

                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small mb-1">Scheduled Date</h6>
                                            <p className="mb-0 fw-bold">{formatDate(selectedIntervention.scheduled_at)}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small mb-1">Location</h6>
                                            <div className="d-flex align-items-center">
                                                <LocationOn sx={{ mr: 1, color: '#dc3545', fontSize: 20 }} />
                                                <span>{selectedIntervention.ticket?.location || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small mb-1">Created At</h6>
                                            <p className="mb-0">{new Date(selectedIntervention.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/interventions" className="btn btn-outline-secondary">
                                        Back to List
                                    </Link>

                                    {selectedIntervention.ticket?.id && (
                                        <Link to={`/tickets/${selectedIntervention.ticket.id}`} className="btn btn-primary" style={{ backgroundColor: '#004598' }}>
                                            View Related Ticket
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default InterventionDetails;
