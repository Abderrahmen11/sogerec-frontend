import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AddCircle, Visibility, Inbox } from '@mui/icons-material';
import useTickets from '../hooks/useTickets';
import useAuth from '../hooks/useAuth';

const Tickets = () => {
    const { tickets, loading, fetchTickets } = useTickets();
    const { isAdmin, isTechnician } = useAuth();
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'open': return '#0073b3';
            case 'in_progress': return '#1299dd';
            case 'closed': return '#004598';
            case 'resolved': return '#198754';
            default: return '#6c757d';
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'high': return '#dc3545';
            case 'medium': return '#ffc107';
            case 'low': return '#0073b3';
            default: return '#6c757d';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredTickets = tickets?.filter(ticket => {
        const statusMatch = filterStatus === 'all' || ticket.status === filterStatus;
        const priorityMatch = filterPriority === 'all' || ticket.priority === filterPriority;
        return statusMatch && priorityMatch;
    }) || [];

    return (
        <main className="container-fluid py-5" style={{ minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h1 className="mb-2" style={{ color: '#3a4856', fontWeight: '700' }}>
                                    {isAdmin() ? 'Tickets Management' : 'My Requests'}
                                </h1>
                                <p className="text-muted mb-0">
                                    {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} found
                                </p>
                            </div>
                            {!isTechnician() && (
                                <Link to="/create-ticket" className="btn custom-btn" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                    <AddCircle sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />New Request
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="row mb-4">
                    <div className="col-md-6 col-lg-3">
                        <label className="form-label fw-bold">Filter by Status</label>
                        <select
                            className="form-select"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        >
                            <option value="all">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <label className="form-label fw-bold">Filter by Priority</label>
                        <select
                            className="form-select"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="custom-block bg-white shadow-lg p-4">
                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading tickets...</p>
                            </div>
                        ) : filteredTickets.length > 0 ? (
                            <table className="table table-hover align-middle mb-0" style={{ borderColor: '#7fffd4' }}>
                                <thead style={{ backgroundColor: 'rgba(18, 153, 221, 0.05)', borderBottom: '2px solid #7fffd4' }}>
                                    <tr>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>#</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Subject</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Status</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Priority</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Created</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Updated</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTickets.map((ticket, index) => (
                                        <tr key={ticket.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                            <td style={{ color: '#3a4856', fontWeight: '600' }}>{index + 1}</td>
                                            <td style={{ color: '#3a4856', maxWidth: '300px' }}>{ticket.title}</td>
                                            <td>
                                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(ticket.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                    {ticket.status?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getPriorityBadgeColor(ticket.priority), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                    {ticket.priority}
                                                </span>
                                            </td>
                                            <td style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(ticket.created_at)}</td>
                                            <td style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(ticket.updated_at)}</td>
                                            <td>
                                                <Link to={`/tickets/${ticket.id}`} className="btn btn-sm" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                                    <Visibility sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-5">
                                <Inbox sx={{ fontSize: '3rem', color: '#ccc', display: 'block', mx: 'auto', mb: 2 }} />
                                <p className="mt-3 text-muted">No tickets found matching your filters</p>
                                {!isTechnician() && (
                                    <Link to="/create-ticket" className="btn custom-btn mt-3" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff' }}>
                                        Create Your First Request
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Tickets;
