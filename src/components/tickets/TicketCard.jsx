import React from 'react';

const TicketCard = ({ ticket }) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">#{ticket.id} - {ticket.title}</h5>
            <p className="card-text">{ticket.description}</p>
            <div>
                <span className="badge bg-info me-2">{ticket.status}</span>
                <span className="badge bg-warning">{ticket.priority}</span>
            </div>
        </div>
    </div>
);

export default TicketCard;

