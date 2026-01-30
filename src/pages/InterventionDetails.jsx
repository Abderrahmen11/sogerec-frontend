import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Work, LocationOn, CalendarToday, Person, Description, Build, PlayArrow, CheckCircle, Assignment } from '@mui/icons-material';
import useInterventions from '../hooks/useInterventions';
import { AuthContext } from '../context/AuthContext';
import { InterventionContext } from '../context/InterventionContext';

const InterventionDetails = () => {
    const { id } = useParams();
    const { selectedIntervention, fetchInterventionById, loading, error } = useInterventions();
    const { user } = useContext(AuthContext);
    const { updateInterventionStatus, submitInterventionReport } = useContext(InterventionContext);
    const [reportText, setReportText] = useState('');
    const [showReportForm, setShowReportForm] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchInterventionById(id);
        }
    }, [id, fetchInterventionById]);

    const handleStatusUpdate = async (newStatus) => {
        setActionLoading(true);
        try {
            await updateInterventionStatus(id, newStatus);
            fetchInterventionById(id);
        } catch (err) {
            console.error("Failed to update status:", err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            await submitInterventionReport(id, reportText);
            setShowReportForm(false);
            fetchInterventionById(id);
        } catch (err) {
            console.error("Failed to submit report:", err);
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'pending': return '#ffc107'; // Warning yellow
            case 'scheduled': return '#0073b3';
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
        <main className="container mt-5 pt-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </main>
    );

    if (error) return (
        <main className="container mt-5 pt-5">
            <div className="alert alert-danger">{error}</div>
            <div className="text-center">
                <Link to="/interventions" className="btn btn-primary">Back to Interventions</Link>
            </div>
        </main>
    );

    if (!selectedIntervention) return (
        <main className="container mt-5 pt-5">
            <div className="alert alert-warning">Intervention not found</div>
            <div className="text-center">
                <Link to="/interventions" className="btn btn-primary">Back to Interventions</Link>
            </div>
        </main>
    );

    const isAssignedTechnician = user?.id === selectedIntervention.user_id;
    const isAdmin = user?.role === 'admin';
    const canManage = isAssignedTechnician || isAdmin;

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
                                            <p className="lead">{selectedIntervention.notes || selectedIntervention.description || 'No additional notes provided.'}</p>
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

                                {canManage && selectedIntervention.status !== 'completed' && selectedIntervention.status !== 'cancelled' && (
                                    <div className="mt-4 p-4 bg-light rounded shadow-sm">
                                        <h5 className="mb-3 d-flex align-items-center gap-2">
                                            <Assignment color="primary" /> Actions
                                        </h5>
                                        <div className="d-flex gap-3 flex-wrap">
                                            {selectedIntervention.status === 'scheduled' && (
                                                <button
                                                    className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm"
                                                    onClick={() => handleStatusUpdate('in_progress')}
                                                    disabled={actionLoading}
                                                >
                                                    <PlayArrow /> {actionLoading ? 'Updating...' : 'Start Intervention'}
                                                </button>
                                            )}

                                            {selectedIntervention.status === 'in_progress' && (
                                                <button
                                                    className="btn btn-success d-flex align-items-center gap-2 px-4 shadow-sm"
                                                    onClick={() => setShowReportForm(true)}
                                                    disabled={actionLoading}
                                                >
                                                    <CheckCircle /> Mark as Completed
                                                </button>
                                            )}
                                        </div>

                                        {showReportForm && (
                                            <div className="mt-4 card shadow-sm border-0">
                                                <div className="card-header bg-success text-white">
                                                    Submit Final Report
                                                </div>
                                                <form className="card-body" onSubmit={handleReportSubmit}>
                                                    <div className="mb-3">
                                                        <label className="form-label fw-bold">Intervention Report Details</label>
                                                        <textarea
                                                            className="form-control"
                                                            value={reportText}
                                                            onChange={(e) => setReportText(e.target.value)}
                                                            required
                                                            placeholder="Describe the work performed, replaced parts, and final results..."
                                                            rows="4"
                                                        ></textarea>
                                                    </div>
                                                    <div className="d-flex gap-2">
                                                        <button type="submit" className="btn btn-success" disabled={actionLoading}>
                                                            {actionLoading ? 'Submitting...' : 'Confirm & Complete'}
                                                        </button>
                                                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowReportForm(false)}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <hr className="my-4" />

                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <Link to="/interventions" className="btn btn-outline-secondary px-4">
                                        Back to List
                                    </Link>

                                    {selectedIntervention.ticket?.id && (
                                        <Link to={`/tickets/${selectedIntervention.ticket.id}`} className="btn btn-primary px-4" style={{ backgroundColor: '#004598' }}>
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

