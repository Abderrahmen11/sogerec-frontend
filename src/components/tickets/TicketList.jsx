import React, { useState, useContext } from 'react';
import TicketContext from '../../context/TicketContext';
import CancelTicketDialog from './CancelTicketDialog';
import './TicketList.css';

const TicketList = ({ tickets = [] }) => {
    const { cancelTicket } = useContext(TicketContext);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [ticketToCancel, setTicketToCancel] = useState(null);

    const handleCancelClick = (id) => {
        setTicketToCancel(id);
        setCancelDialogOpen(true);
    };

    const handleConfirmCancel = async (id, reason) => {
        try {
            await cancelTicket(id, reason);
            setCancelDialogOpen(false);
            setTicketToCancel(null);
        } catch (error) {
            console.error("Failed to cancel ticket:", error);
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover ticket-table-compact mb-0 mobile-responsive-table">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Date</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.length > 0 ? (
                                    tickets.map(ticket => (
                                        <tr key={ticket.id}>
                                            <td data-label="ID" className="fw-bold">#{ticket.id}</td>
                                            <td data-label="Title" className="ticket-title-cell">{ticket.title}</td>
                                            <td data-label="Status">
                                                <span className={`badge ticket-status-badge bg-${ticket.status === 'open' ? 'info' :
                                                    ticket.status === 'in_progress' ? 'warning' :
                                                        ticket.status === 'closed' ? 'secondary' : 'danger'
                                                    }`} style={{ textTransform: 'capitalize' }}>
                                                    {ticket.status?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td data-label="Priority">
                                                <span className={`badge bg-${ticket.priority === 'urgent' ? 'danger' :
                                                    ticket.priority === 'high' ? 'warning' : 'primary'
                                                    }`}>
                                                    {ticket.priority}
                                                </span>
                                            </td>
                                            <td data-label="Date" className="text-muted small">
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </td>
                                            <td data-label="Actions" className="text-end">
                                                {ticket.status !== 'closed' && (
                                                    <button
                                                        className="btn btn-outline-danger btn-sm btn-cancel-ticket"
                                                        onClick={() => handleCancelClick(ticket.id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="6" className="text-center p-5 text-muted">No tickets found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {cancelDialogOpen && (
                <CancelTicketDialog
                    open={cancelDialogOpen}
                    onClose={() => setCancelDialogOpen(false)}
                    onConfirm={handleConfirmCancel}
                    ticketId={ticketToCancel}
                />
            )}
        </div>
    );
};

export default TicketList;

