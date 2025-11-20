import React from 'react';

const TicketList = ({ tickets = [] }) => (
    <div className="row">
        <div className="col-12">
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length > 0 ? (
                                tickets.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td>#{ticket.id}</td>
                                        <td>{ticket.title}</td>
                                        <td><span className="badge bg-info">{ticket.status}</span></td>
                                        <td><span className="badge bg-warning">{ticket.priority}</span></td>
                                        <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="text-center p-4">No tickets found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default TicketList;

