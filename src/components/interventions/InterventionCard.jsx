import React from 'react';

const InterventionCard = ({ intervention }) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">#{intervention.id}</h5>
            <p className="card-text">{intervention.description}</p>
            <div>
                <span className="badge bg-info me-2">{intervention.status}</span>
                <small className="text-muted">Technician: {intervention.technician?.name || 'TBD'}</small>
            </div>
        </div>
    </div>
);

export default InterventionCard;

