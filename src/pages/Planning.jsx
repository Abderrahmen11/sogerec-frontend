import React, { useState } from 'react';
import { CalendarMonth, List, Event, Assignment, Person, CalendarToday, Info } from '@mui/icons-material';
import useInterventions from '../hooks/useInterventions';

const Planning = () => {
    const { interventions, loading } = useInterventions();
    const [viewMode, setViewMode] = useState('list'); // list or calendar

    // Filter for all interventions (not just upcoming)
    const allInterventions = interventions || [];

    // Calculate summary stats by status
    const plannedCount = allInterventions.filter(i => i.status === 'planned').length;
    const inProgressCount = allInterventions.filter(i => i.status === 'in_progress').length;
    const completedCount = allInterventions.filter(i => i.status === 'completed').length;
    const cancelledCount = allInterventions.filter(i => i.status === 'cancelled').length;

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'planned': return '#0073b3';
            case 'in_progress': return '#1299dd';
            case 'completed': return '#198754';
            case 'cancelled': return '#dc3545';
            default: return '#6c757d';
        }
    };

    return (
        <main className="container-fluid py-5" style={{ minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                            <div>
                                <h1 className="mb-2" style={{ color: '#3a4856', fontWeight: '700' }}>
                                    <CalendarMonth sx={{ mr: 1, verticalAlign: 'middle', fontSize: 28 }} />Planning & Scheduling
                                </h1>
                                <p className="text-muted mb-0">Track and manage all scheduled interventions for technicians</p>
                            </div>
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    className={`btn btn-sm ${viewMode === 'list' ? '' : 'btn-outline-primary'}`}
                                    onClick={() => setViewMode('list')}
                                    style={{ backgroundColor: viewMode === 'list' ? '#004598' : 'transparent', color: viewMode === 'list' ? '#fff' : '#004598', borderColor: '#004598' }}
                                >
                                    <List sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />List
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${viewMode === 'calendar' ? '' : 'btn-outline-primary'}`}
                                    onClick={() => setViewMode('calendar')}
                                    style={{ backgroundColor: viewMode === 'calendar' ? '#004598' : 'transparent', color: viewMode === 'calendar' ? '#fff' : '#004598', borderColor: '#004598' }}
                                >
                                    <Event sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />Calendar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="row g-4 mb-5">
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-primary text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Planned</h5>
                            <p className="display-6 fw-bold">{plannedCount}</p>
                            <span className="badge bg-light text-primary">Scheduled</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-info text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">In Progress</h5>
                            <p className="display-6 fw-bold">{inProgressCount}</p>
                            <span className="badge bg-light text-info">Active</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-success text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Completed</h5>
                            <p className="display-6 fw-bold">{completedCount}</p>
                            <span className="badge bg-light text-success">Done</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-danger text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Cancelled</h5>
                            <p className="display-6 fw-bold">{cancelledCount}</p>
                            <span className="badge bg-light text-danger">Closed</span>
                        </div>
                    </div>
                </div>

                {/* Interventions Table */}
                <div className="custom-block bg-white shadow-lg p-4">
                    <h5 className="mb-4" style={{ color: '#3a4856', fontWeight: '600' }}>
                        <Assignment sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20, color: '#1299dd' }} />
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
                        ) : allInterventions.length > 0 ? (
                            <table className="table table-hover align-middle mb-0" style={{ borderColor: '#7fffd4' }}>
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
                                    {allInterventions.map((intervention) => (
                                        <tr key={intervention.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                            <td style={{ color: '#3a4856', fontWeight: '600' }}>#{intervention.id}</td>
                                            <td style={{ color: '#3a4856' }}>
                                                <Person sx={{ mr: 1, verticalAlign: 'middle', fontSize: 18, color: '#1299dd' }} />
                                                {intervention.user?.name || 'Unassigned'}
                                            </td>
                                            <td style={{ color: '#3a4856' }}>{intervention.ticket?.user?.name || 'Unknown'}</td>
                                            <td style={{ color: '#717275', fontSize: '0.95rem' }}>{formatDate(intervention.scheduled_at)}</td>
                                            <td>
                                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(intervention.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                    {intervention.status?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>
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

                {/* Footer Notes */}
                <div className="row mt-5">
                    <div className="col-lg-8 col-12">
                        <div className="custom-block bg-info bg-opacity-10 p-4" style={{ borderLeft: '4px solid #1299dd' }}>
                            <h6 className="mb-2" style={{ color: '#3a4856', fontWeight: '600' }}>
                                <Info sx={{ mr: 1, verticalAlign: 'middle', fontSize: 18, color: '#1299dd' }} />
                                Planning Guidelines
                            </h6>
                            <p className="mb-1" style={{ color: '#717275', fontSize: '0.95rem' }}>
                                • All interventions must be scheduled with a date and assigned technician
                            </p>
                            <p className="mb-1" style={{ color: '#717275', fontSize: '0.95rem' }}>
                                • Status updates are required when interventions progress
                            </p>
                            <p className="mb-0" style={{ color: '#717275', fontSize: '0.95rem' }}>
                                • Completed interventions should be marked with validation from supervisor
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
export default Planning;
