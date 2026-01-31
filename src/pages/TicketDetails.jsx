import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTickets from '../hooks/useTickets';
import { AuthContext } from '../context/AuthContext';
import { InterventionContext } from '../context/InterventionContext';
import InterventionForm from '../components/interventions/InterventionForm';
import { Build, AssignmentInd, ArrowBack } from '@mui/icons-material';

const TicketDetails = () => {
    const { id } = useParams();
    const { selectedTicket, fetchTicketById, loading, error } = useTickets();
    const { user } = useContext(AuthContext);
    const { createIntervention } = useContext(InterventionContext);
    const [showAssignForm, setShowAssignForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const assignmentRef = React.useRef(null);

    useEffect(() => {
        fetchTicketById(id);
    }, [id, fetchTicketById]);

    // Scroll to form when opened
    useEffect(() => {
        if (showAssignForm && assignmentRef.current) {
            assignmentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [showAssignForm]);

    const handleAssignSubmit = async (formData) => {
        try {
            const response = await createIntervention(formData);
            // Do NOT trust success - verify response contains assignment confirmation
            const data = response?.data ?? response;
            const hasAssignment = Boolean(
                data?.assignment_confirmed ||
                data?.assigned_to_user_id ||
                data?.technician_name ||
                (data?.intervention?.ticket?.assigned_to ?? data?.ticket?.assigned_to)
            );

            if (!hasAssignment) {
                throw new Error('Assignment did not persist. Server did not confirm assignment.');
            }

            setShowAssignForm(false);

            // Refetch ticket and verify technician appears - no optimistic UI
            const refetchedTicket = await fetchTicketById(id);
            const ticket = refetchedTicket?.data ?? refetchedTicket;
            const technicianPresent =
                ticket?.assigned_to_user?.name ||
                ticket?.assignedTo?.name ||
                ticket?.assigned_to_user_id ||
                ticket?.technician_name;

            if (!technicianPresent) {
                throw new Error('Assignment may not have persisted. Please refresh the page to verify.');
            }

            setSuccessMessage('Technician assigned successfully!');
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err) {
            console.error("Assignment failed:", err);
            throw err;
        }
    };

    if (loading) return (
        <main className="container mt-5 pt-5 text-center">
            <div className="spinner-border text-primary" role="status"></div>
        </main>
    );

    if (error) return (
        <main className="container mt-5 pt-5">
            <div className="alert alert-danger">{error}</div>
        </main>
    );

    if (!selectedTicket) return (
        <main className="container mt-5 pt-5">
            <div className="alert alert-warning">Ticket not found</div>
        </main>
    );

    const isAdmin = user?.role === 'admin';

    return (
        <main className="flex-shrink-0" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            <h2 className="text-white mb-2">{selectedTicket.title}</h2>
                            <p className="text-light mb-4">Tracking request details and technical updates for your maintenance intervention.</p>
                            <div className="d-flex justify-content-center gap-3">
                                <span className={`badge bg-${selectedTicket.status === 'resolved' ? 'success' :
                                    selectedTicket.status === 'in_progress' ? 'info' :
                                        selectedTicket.status === 'closed' ? 'secondary' : 'warning'
                                    } fs-6 text-capitalize px-3 py-2 shadow-sm`}>
                                    {selectedTicket.status?.replace('_', ' ')}
                                </span>
                                <span className={`badge bg-${selectedTicket.priority === 'urgent' ? 'danger' :
                                    selectedTicket.priority === 'high' ? 'danger' :
                                        selectedTicket.priority === 'medium' ? 'primary' : 'success'
                                    } fs-6 text-capitalize px-3 py-2 shadow-sm`}>
                                    {selectedTicket.priority} Priority
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-padding flex-grow-1" style={{ paddingBottom: '350px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 mx-auto">
                            {successMessage && (
                                <div className="alert alert-success shadow-lg border-0 mb-4 fade show" role="alert">
                                    <div className="d-flex align-items-center">
                                        <Build className="me-2" />
                                        <strong>Success!</strong> {successMessage}
                                    </div>
                                </div>
                            )}

                            <div className="custom-block bg-white shadow-lg p-4 p-md-5 mb-5 border-0" style={{ height: 'auto' }}>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="mb-0 text-primary">Ticket Description</h4>
                                    <span className="badge bg-light text-dark border p-2">Ticket ID: #{selectedTicket.id}</span>
                                </div>

                                <p className="mb-4 lead text-dark" style={{ lineHeight: '1.8' }}>{selectedTicket.description}</p>

                                <hr className="my-5" />

                                <h5 className="mb-4 d-flex align-items-center">
                                    <AssignmentInd className="me-2 text-primary" /> Technical Details
                                </h5>

                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="p-3 bg-light rounded-3 h-100">
                                            <div className="text-muted small text-uppercase fw-bold mb-1">Created At</div>
                                            <div className="fw-semibold">{new Date(selectedTicket.created_at).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-3 bg-light rounded-3 h-100">
                                            <div className="text-muted small text-uppercase fw-bold mb-1">Last Updated</div>
                                            <div className="fw-semibold">{new Date(selectedTicket.updated_at).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-3 bg-light rounded-3 h-100">
                                            <div className="text-muted small text-uppercase fw-bold mb-1">Category</div>
                                            <div className="fw-semibold">{selectedTicket.category || 'General Maintenance'}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-3 bg-light rounded-3 h-100">
                                            <div className="text-muted small text-uppercase fw-bold mb-1">Assigned Technician</div>
                                            <div className="fw-semibold text-primary">
                                                {selectedTicket.assigned_to_user?.name || selectedTicket.assignedTo?.name || selectedTicket.technician_name || (
                                                    <span className="text-muted">Currently Unassigned</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isAdmin && !selectedTicket.assigned_to_user && !selectedTicket.assignedTo && !selectedTicket.assigned_to_user_id && (
                                <div className="mt-5 pt-4" ref={assignmentRef}>
                                    {!showAssignForm ? (
                                        <div className="text-center mb-4">
                                            <button
                                                className="btn btn-primary d-inline-flex align-items-center gap-2 px-5 py-3 shadow-lg rounded-pill"
                                                onClick={() => setShowAssignForm(true)}
                                                style={{
                                                    backgroundColor: '#004598',
                                                    fontSize: '1.1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <Build /> Assign a Technician Now
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="card shadow-lg border-0 overflow-hidden fade-in mb-5" style={{ borderRadius: '15px' }}>
                                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                                                <h5 className="mb-0 d-flex align-items-center gap-2">
                                                    <AssignmentInd /> Technician Assignment
                                                </h5>
                                                <button className="btn btn-sm btn-light rounded-pill px-3" onClick={() => setShowAssignForm(false)}>Cancel</button>
                                            </div>
                                            <div className="card-body p-4 bg-white">
                                                <InterventionForm
                                                    ticketId={selectedTicket.id}
                                                    onSubmit={handleAssignSubmit}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="mt-5 text-center" style={{ paddingBottom: '150px', marginBottom: '100px' }}>
                                <Link to="/tickets" className="btn btn-link text-decoration-none d-inline-flex align-items-center gap-2 text-muted fw-bold">
                                    <ArrowBack fontSize="small" /> Back to All Tickets
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );
};

export default TicketDetails;

