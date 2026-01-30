import React from 'react';
import { Person } from '@mui/icons-material';
import { CalendarToday } from '@mui/icons-material';

const PlanningList = ({ interventions, loading, getStatusBadgeColor, formatDate }) => {
    return (
        <div className="custom-block bg-white shadow-lg p-4">
            <h5 className="mb-4" style={{ color: '#3a4856', fontWeight: '600' }}>
                All Interventions Schedule
            </h5>

            <div className="table-responsive">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading interventions...</p>
                    </div>
                ) : interventions.length > 0 ? (
                    <table className="table table-hover align-middle mb-0 mobile-responsive-table" style={{ borderColor: '#7fffd4' }}>
                        <thead style={{ backgroundColor: 'rgba(18, 153, 221, 0.05)', borderBottom: '2px solid #7fffd4' }}>
                            <tr>
                                <th style={{ color: '#3a4856', fontWeight: '600' }}>ID</th>
                                <th style={{ color: '#3a4856', fontWeight: '600' }}>Technician</th>
                                <th style={{ color: '#3a4856', fontWeight: '600' }}>Client</th>
                                <th style={{ color: '#3a4856', fontWeight: '600' }}>Scheduled Date</th>
                                <th style={{ color: '#3a4856', fontWeight: '600' }}>Status</th>
                                <th style={{ color: '#3a4856', fontWeight: '600' }}>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interventions.map((intervention) => (
                                <tr key={intervention.id}>
                                    <td data-label="ID" style={{ color: '#3a4856', fontWeight: '600' }}>#{intervention.id}</td>
                                    <td data-label="Technician" style={{ color: '#3a4856' }}>
                                        <Person sx={{ mr: 1, verticalAlign: 'middle', fontSize: 18, color: '#1299dd' }} />
                                        {intervention.user?.name || 'Unassigned'}
                                    </td>
                                    <td data-label="Client" style={{ color: '#3a4856' }}>{intervention.ticket?.user?.name || 'Unknown'}</td>
                                    <td data-label="Scheduled Date" style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(intervention.scheduled_at)}</td>
                                    <td data-label="Status">
                                        <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(intervention.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                            {intervention.status?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td data-label="Progress">
                                        <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: intervention.status === 'completed' ? '100%' :
                                                        intervention.status === 'in_progress' ? '50%' :
                                                            intervention.status === 'cancelled' ? '0%' : '25%',
                                                    backgroundColor: getStatusBadgeColor(intervention.status)
                                                }}
                                                aria-valuenow={intervention.status === 'completed' ? 100 : 50}
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-5">
                        <CalendarToday sx={{ fontSize: '3rem', color: '#ccc', display: 'block', mx: 'auto', mb: 2 }} />
                        <p className="mt-3 text-muted">No interventions scheduled yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlanningList;
