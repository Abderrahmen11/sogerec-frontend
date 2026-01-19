import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, Work } from '@mui/icons-material';
import useInterventions from '../hooks/useInterventions';
import useAuth from '../hooks/useAuth';

const Interventions = () => {
    const { interventions, loading, fetchInterventions } = useInterventions();
    const { isTechnician } = useAuth();
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchInterventions();
    }, [fetchInterventions]);

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'planned': return '#0073b3';
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
        return filterStatus === 'all' || intervention.status === filterStatus;
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
                            <option value="planned">Planned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
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
                            <table className="table table-hover align-middle mb-0" style={{ borderColor: '#7fffd4' }}>
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
                                        <tr key={intervention.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                            <td style={{ color: '#3a4856', fontWeight: '600' }}>{index + 1}</td>
                                            <td style={{ color: '#3a4856' }}>{intervention.user?.name || 'Unassigned'}</td>
                                            <td style={{ color: '#3a4856' }}>{intervention.ticket?.user?.name || 'Unknown'}</td>
                                            <td style={{ color: '#717275', fontSize: '0.95rem' }}>{intervention.ticket?.location || 'N/A'}</td>
                                            <td style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(intervention.scheduled_at)}</td>
                                            <td>
                                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(intervention.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                    {intervention.status?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>
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
