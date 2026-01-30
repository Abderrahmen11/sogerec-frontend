import React, { useState } from 'react';
import { CalendarMonth, List, Event, Info } from '@mui/icons-material';
import useInterventions from '../hooks/useInterventions';
import PlanningList from '../components/interventions/PlanningList';
import PlanningCalendar from '../components/interventions/PlanningCalendar';

const Planning = () => {
    const { interventions, loading } = useInterventions();
    const [viewMode, setViewMode] = useState('list'); // list or calendar

    // Filter for all interventions (not just upcoming)
    const allInterventions = interventions || [];

    // Calculate summary stats by status
    const pendingCount = allInterventions.filter(i => i.status === 'pending').length;
    const scheduledCount = allInterventions.filter(i => i.status === 'scheduled').length;
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
            case 'pending': return '#ffc107'; // Warning yellow
            case 'scheduled': return '#0073b3';
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

                <div className="row g-4 mb-5">
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="custom-block bg-warning text-dark shadow-sm p-3 h-100 text-center border-0">
                            <h6 className="mb-2">Pending</h6>
                            <h3 className="fw-bold mb-0">{pendingCount}</h3>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="custom-block bg-primary text-white shadow-sm p-3 h-100 text-center border-0">
                            <h6 className="mb-2">Scheduled</h6>
                            <h3 className="fw-bold mb-0">{scheduledCount}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-info text-white shadow-sm p-4 h-100 text-center border-0">
                            <h5 className="mb-2 text-uppercase small ls-wide">In Progress</h5>
                            <p className="display-6 fw-bold mb-2">{inProgressCount}</p>
                            <span className="badge bg-light text-info">Active</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-success text-white shadow-sm p-4 h-100 text-center border-0">
                            <h5 className="mb-2 text-uppercase small ls-wide">Completed</h5>
                            <p className="display-6 fw-bold mb-2">{completedCount}</p>
                            <span className="badge bg-light text-success">Done</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-12">
                        <div className="custom-block bg-danger text-white shadow-sm p-3 h-100 text-center border-0">
                            <h6 className="mb-2">Cancelled</h6>
                            <h3 className="fw-bold mb-0">{cancelledCount}</h3>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="mb-5">
                    {viewMode === 'list' ? (
                        <PlanningList
                            interventions={allInterventions}
                            loading={loading}
                            getStatusBadgeColor={getStatusBadgeColor}
                            formatDate={formatDate}
                        />
                    ) : (
                        <PlanningCalendar
                            interventions={allInterventions}
                            loading={loading}
                            getStatusBadgeColor={getStatusBadgeColor}
                        />
                    )}
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
