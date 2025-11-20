import React from 'react';

const TicketDetails = ({ ticket }) => {
    if (!ticket) return <div>No ticket selected</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h4>Ticket #{ticket.id}</h4>
                <h6 className="text-muted mb-3">{ticket.title}</h6>
                <p>{ticket.description}</p>
                <div className="mb-3">
                    <strong>Status:</strong> {ticket.status}
                </div>
                <div className="mb-3">
                    <strong>Priority:</strong> {ticket.priority}
                </div>
                <div className="mb-3">
                    <strong>Created:</strong> {new Date(ticket.created_at).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;

