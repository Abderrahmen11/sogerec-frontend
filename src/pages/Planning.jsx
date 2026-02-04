import React, { useState, useEffect } from 'react';
import { CalendarMonth, List, Event, Info } from '@mui/icons-material';
import useInterventions from '../hooks/useInterventions';
import PlanningList from '../components/interventions/PlanningList';
import PlanningCalendar from '../components/interventions/PlanningCalendar';
import AnimatedNumber from '../components/common/AnimatedNumber';

const Planning = () => {
    const { interventions, loading, error, fetchPlanning } = useInterventions();
    const [viewMode, setViewMode] = useState('list');
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [sortBy, setSortBy] = useState('scheduled_at');
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' = oldest first, 'desc' = newest first

    useEffect(() => {
        fetchPlanning();

        // Re-fetch when user returns to this page (focus event)
        const handleFocus = () => {
            fetchPlanning();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [fetchPlanning]);

    // Filter for all interventions (not just upcoming)
    const allInterventions = (interventions || []).filter(intervention => {
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
        return true;
    }).sort((a, b) => {
        // Sorting by scheduled_at date
        const dateA = new Date(a.scheduled_at);
        const dateB = new Date(b.scheduled_at);

        if (sortOrder === 'desc') {
            return dateB - dateA; // Newest first
        } else {
            return dateA - dateB; // Oldest first
        }
    });

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

                {/* Date Filters */}
                <div className="row mb-4">
                    <div className="col-md-6 col-lg-3">
                        <label htmlFor="filterDateFrom" className="form-label fw-bold">From Date</label>
                        <input
                            type="date"
                            id="filterDateFrom"
                            name="filterDateFrom"
                            className="form-control"
                            value={filterDateFrom}
                            onChange={(e) => setFilterDateFrom(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <label htmlFor="filterDateTo" className="form-label fw-bold">To Date</label>
                        <input
                            type="date"
                            id="filterDateTo"
                            name="filterDateTo"
                            className="form-control"
                            value={filterDateTo}
                            onChange={(e) => setFilterDateTo(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        />
                    </div>
                    {(filterDateFrom || filterDateTo) && (
                        <div className="col-md-6 col-lg-3 d-flex align-items-end">
                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
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
                        <label htmlFor="sortOrder" className="form-label fw-bold">Sort By</label>
                        <select
                            id="sortOrder"
                            name="sortOrder"
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

                {/* Error Alert */}
                {error && (
                    <div className="alert alert-danger mb-4 shadow-sm border-0">
                        <Info sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
                        {error}
                        <button
                            className="btn btn-sm btn-outline-danger ms-3"
                            onClick={() => fetchPlanning()}
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="row g-4 mb-5">
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="custom-block bg-warning text-dark shadow-sm p-3 h-100 text-center border-0">
                            <h6 className="mb-2">Pending</h6>
                            <h3 className="fw-bold mb-0">
                                <AnimatedNumber value={pendingCount} />
                            </h3>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="custom-block bg-primary text-white shadow-sm p-3 h-100 text-center border-0">
                            <h6 className="mb-2">Scheduled</h6>
                            <h3 className="fw-bold mb-0">
                                <AnimatedNumber value={scheduledCount} />
                            </h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-info text-white shadow-sm p-4 h-100 text-center border-0">
                            <h5 className="mb-2 text-uppercase small ls-wide">In Progress</h5>
                            <p className="display-6 fw-bold mb-2">
                                <AnimatedNumber value={inProgressCount} />
                            </p>
                            <span className="badge bg-light text-info">Active</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="custom-block bg-success text-white shadow-sm p-4 h-100 text-center border-0">
                            <h5 className="mb-2 text-uppercase small ls-wide">Completed</h5>
                            <p className="display-6 fw-bold mb-2">
                                <AnimatedNumber value={completedCount} />
                            </p>
                            <span className="badge bg-light text-success">Done</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-12">
                        <div className="custom-block bg-danger text-white shadow-sm p-3 h-100 text-center border-0">
                            <h6 className="mb-2">Cancelled</h6>
                            <h3 className="fw-bold mb-0">
                                <AnimatedNumber value={cancelledCount} />
                            </h3>
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
                            sortOrder={sortOrder}
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
