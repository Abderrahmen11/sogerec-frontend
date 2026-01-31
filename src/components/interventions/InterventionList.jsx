import React, { useMemo } from 'react';
import { Visibility, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const InterventionList = ({ interventions = [], loading = false, onRefresh = null, filterDateFrom = '', filterDateTo = '', sortOrder = 'desc' }) => {
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'pending': return '#ffc107';
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

    // Apply date filtering
    const filteredInterventions = useMemo(() => {
        return interventions.filter(intervention => {
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
            return true;
        });
    }, [interventions, filterDateFrom, filterDateTo]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow-lg">
                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading interventions...</p>
                            </div>
                        ) : interventions.length > 0 ? (
                            <table className="table table-hover align-middle mb-0">
                                <thead style={{ backgroundColor: 'rgba(18, 153, 221, 0.05)', borderBottom: '2px solid #7fffd4' }}>
                                    <tr>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>ID</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Ticket Title</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Client</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Location</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Technician</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            Scheduled Date
                                            {sortOrder === 'desc' ? (
                                                <ArrowDownward sx={{ fontSize: 16, color: '#1299dd' }} title="Newest first" />
                                            ) : (
                                                <ArrowUpward sx={{ fontSize: 16, color: '#1299dd' }} title="Oldest first" />
                                            )}
                                        </th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Status</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Created</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInterventions.length > 0 ? (
                                        filteredInterventions.map(intervention => (
                                            <tr key={intervention.id}>
                                                <td style={{ color: '#3a4856', fontWeight: '600' }}>#{intervention.id}</td>
                                                <td style={{ color: '#3a4856' }}>{intervention.ticket?.title || 'No title'}</td>
                                                <td style={{ color: '#3a4856' }}>{intervention.ticket?.user?.name || 'Unknown'}</td>
                                                <td style={{ color: '#3a4856', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={intervention.location || 'Not specified'}>
                                                    {intervention.location || 'Not specified'}
                                                </td>
                                                <td style={{ color: '#3a4856' }}>{intervention.user?.name || 'Unassigned'}</td>
                                                <td style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(intervention.scheduled_at)}</td>
                                                <td>
                                                    <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(intervention.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                        {intervention.status?.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(intervention.created_at)}</td>
                                                <td>
                                                    <Link to={`/interventions/${intervention.id}`} className="btn btn-sm" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                                        <Visibility sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center py-5 text-muted">
                                                No interventions found for the selected date range
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-5">
                                <p className="text-muted">No interventions found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterventionList;

