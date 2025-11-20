import React from 'react';

const InterventionList = ({ interventions = [] }) => (
    <div className="row">
        <div className="col-12">
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Technician</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interventions.length > 0 ? (
                                interventions.map(intervention => (
                                    <tr key={intervention.id}>
                                        <td>#{intervention.id}</td>
                                        <td>{intervention.description}</td>
                                        <td><span className="badge bg-info">{intervention.status}</span></td>
                                        <td>{intervention.technician?.name || 'Unassigned'}</td>
                                        <td>{new Date(intervention.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="text-center p-4">No interventions found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default InterventionList;

