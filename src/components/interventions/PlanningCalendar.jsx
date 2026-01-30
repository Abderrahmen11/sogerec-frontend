import React from 'react';
import { CalendarToday, Person } from '@mui/icons-material';

const PlanningCalendar = ({ interventions, loading, getStatusBadgeColor }) => {
    // Group interventions by date
    const interventionsByDate = interventions.reduce((acc, intervention) => {
        if (!intervention.scheduled_at) return acc;
        const date = new Date(intervention.scheduled_at).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(intervention);
        return acc;
    }, {});

    // Sort dates
    const sortedDates = Object.keys(interventionsByDate).sort((a, b) => new Date(a) - new Date(b));

    if (loading) {
        return (
            <div className="text-center py-5 bg-white shadow-lg rounded">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading calendar...</p>
            </div>
        );
    }

    if (interventions.length === 0) {
        return (
            <div className="text-center py-5 bg-white shadow-lg rounded">
                <CalendarToday sx={{ fontSize: '3rem', color: '#ccc', display: 'block', mx: 'auto', mb: 2 }} />
                <p className="mt-3 text-muted">No interventions scheduled yet</p>
            </div>
        );
    }

    return (
        <div className="planning-calendar">
            <div className="row g-4">
                {sortedDates.map(date => (
                    <div key={date} className="col-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-light border-0 py-3">
                                <h5 className="mb-0 text-primary fw-bold">
                                    <CalendarToday sx={{ mr: 1, fontSize: 20, verticalAlign: 'text-bottom' }} />
                                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </h5>
                            </div>
                            <div className="card-body p-0">
                                <div className="list-group list-group-flush">
                                    {interventionsByDate[date].map(intervention => (
                                        <div key={intervention.id} className="list-group-item p-3 border-bottom">
                                            <div className="row align-items-center">
                                                <div className="col-md-2 col-4 mb-2 mb-md-0">
                                                    <span className="badge w-100 py-2" style={{ backgroundColor: getStatusBadgeColor(intervention.status), fontSize: '0.8rem' }}>
                                                        {new Date(intervention.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <div className="col-md-7 col-8 mb-2 mb-md-0">
                                                    <h6 className="mb-1 fw-bold text-dark">
                                                        #{intervention.id} - {intervention.ticket?.title || 'Untitled Intervention'}
                                                    </h6>
                                                    <div className="d-flex align-items-center text-muted small">
                                                        <Person sx={{ fontSize: 16, mr: 0.5 }} />
                                                        {intervention.user?.name || 'Unassigned'}
                                                        <span className="mx-2">•</span>
                                                        <span>Client: {intervention.ticket?.user?.name || 'Unknown'}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-12 text-md-end">
                                                    <span className="badge rounded-pill" style={{
                                                        color: getStatusBadgeColor(intervention.status),
                                                        border: `1px solid ${getStatusBadgeColor(intervention.status)}`,
                                                        background: 'transparent'
                                                    }}>
                                                        {intervention.status?.replace('_', ' ')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanningCalendar;
