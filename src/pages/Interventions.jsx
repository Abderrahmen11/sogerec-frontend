import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, Work } from '@mui/icons-material';
import useInterventions from '../hooks/useInterventions';
import useAuth from '../hooks/useAuth';

const Interventions = () => {
    const { interventions, loading, fetchInterventions } = useInterventions();
    const { isTechnician } = useAuth();
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' = oldest first, 'desc' = newest first

    useEffect(() => {
        fetchInterventions();

        // Re-fetch when user returns to this page (focus event)
        const handleFocus = () => {
            fetchInterventions();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [fetchInterventions]);

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
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredInterventions = interventions?.filter(intervention => {
        const statusMatch = filterStatus === 'all' || intervention.status === filterStatus;

        // Date filtering
        if (filterDateFrom || filterDateTo) {
            const interventionDate = new Date(intervention.scheduled_at);
            if (filterDateFrom) {
                const fromDate = new Date(filterDateFrom);
                if (interventionDate < fromDate) return false;
            }
            if (filterDateTo) {
                const toDate = new Date(filterDateTo);
                toDate.setHours(23, 59, 59, 999);
                if (interventionDate > toDate) return false;
            }
        }

        return statusMatch;
    }).sort((a, b) => {
        // Sorting by scheduled_at date
        const dateA = new Date(a.scheduled_at);
        const dateB = new Date(b.scheduled_at);

        if (sortOrder === 'desc') {
            return dateB - dateA; // Newest first
        } else {
            return dateA - dateB; // Oldest first
        }
    }) || [];

    return (
        <main className="section-padding">
            <div className="container">
                {/* Page Header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div>
                            <h1 className="mb-2" style={{ color: '#3a4856', fontWeight: '700' }}>
                                {isTechnician() ? 'My Interventions' : 'All Interventions'}
                            </h1>
                            <p className="text-muted mb-0">
                                {filteredInterventions.length} intervention{filteredInterventions.length !== 1 ? 's' : ''} found
                            </p>
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
                            <option value="pending">Pending</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <label className="form-label fw-bold">From Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={filterDateFrom}
                            onChange={(e) => setFilterDateFrom(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <label className="form-label fw-bold">To Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={filterDateTo}
                            onChange={(e) => setFilterDateTo(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        />
                    </div>
                    {(filterStatus !== 'all' || filterDateFrom || filterDateTo) && (
                        <div className="col-md-6 col-lg-3 d-flex align-items-end">
                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
                                    setFilterStatus('all');
                                    setFilterDateFrom('');
                                    setFilterDateTo('');
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Sort Controls */}
                <div className="row mb-4">
                    <div className="col-md-6 col-lg-3">
                        <label className="form-label fw-bold">Sort By</label>
                        <select
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>

                {/* Interventions Table */}
                <div className="custom-block bg-white shadow-lg p-4">
                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading interventions...</p>
                            </div>
                        ) : filteredInterventions.length > 0 ? (
                            <table className="table table-hover align-middle mb-0 mobile-responsive-table" style={{ borderColor: '#7fffd4' }}>
                                <thead style={{ backgroundColor: 'rgba(18, 153, 221, 0.05)', borderBottom: '2px solid #7fffd4' }}>
                                    <tr>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>#</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Technician</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Client</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Location</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Start Date</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Status</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInterventions.map((intervention, index) => (
                                        <tr key={intervention.id}>
                                            <td data-label="#" style={{ color: '#3a4856', fontWeight: '600' }}>{index + 1}</td>
                                            <td data-label="Technician" style={{ color: '#3a4856' }}>{intervention.user?.name || 'Unassigned'}</td>
                                            <td data-label="Client" style={{ color: '#3a4856' }}>{intervention.ticket?.user?.name || 'N/A'}</td>
                                            <td data-label="Location" style={{ color: '#717275', fontSize: '0.95rem' }}>{intervention.location || intervention.ticket?.location || 'N/A'}</td>
                                            <td data-label="Start Date" style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(intervention.scheduled_at)}</td>
                                            <td data-label="Status">
                                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(intervention.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                    {intervention.status?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td data-label="Action">
                                                <Link to={`/interventions/${intervention.id}`} className="btn btn-sm" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                                    <Visibility sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-5">
                                <Work sx={{ fontSize: '3rem', color: '#ccc', display: 'block', mx: 'auto', mb: 2 }} />
                                <p className="mt-3 text-muted">No interventions found matching your filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Interventions;
