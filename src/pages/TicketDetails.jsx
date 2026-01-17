import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTickets from '../hooks/useTickets';

const TicketDetails = () => {
    const { id } = useParams();
    const { selectedTicket, fetchTicketById, loading, error } = useTickets();

    useEffect(() => {
        fetchTicketById(id);
    }, [id, fetchTicketById]);

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;
    if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
    if (!selectedTicket) return <div className="container mt-5"><div className="alert alert-warning">Ticket not found</div></div>;

    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            <h2 className="text-white mb-2">{selectedTicket.title}</h2>
                            <p className="text-light mb-4">Tracking request details and technical updates for your maintenance intervention.</p>
                            <div className="d-flex justify-content-center gap-3">
                                <span className={`badge bg-${selectedTicket.status === 'resolved' ? 'primary' :
                                    selectedTicket.status === 'in_progress' ? 'info' :
                                        selectedTicket.status === 'closed' ? 'secondary' : 'warning'
                                    } fs-6`}>
                                    {selectedTicket.status}
                                </span>
                                <span className={`badge bg-${selectedTicket.priority === 'high' ? 'danger' :
                                    selectedTicket.priority === 'medium' ? 'primary' : 'success'
                                    } fs-6`}>
                                    {selectedTicket.priority} Priority
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 mx-auto">
                            <div className="custom-block bg-white shadow-lg p-4">
                                <h4 className="mb-3">Description</h4>
                                <p className="mb-4">{selectedTicket.description}</p>

                                <hr className="my-4" />

                                <h5 className="mb-3">Details</h5>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <strong>Created:</strong> {new Date(selectedTicket.created_at).toLocaleString()}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <strong>Last Updated:</strong> {new Date(selectedTicket.updated_at).toLocaleString()}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <strong>Category:</strong> {selectedTicket.category || 'General'}
                                    </div>
                                </div>

                                {/* Placeholder for comments/history if available in the future */}
                            </div>

                            <div className="mt-4 text-center">
                                <Link to="/tickets" className="btn btn-secondary me-2">Back to List</Link>
                                {/* Add Edit button if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TicketDetails;
