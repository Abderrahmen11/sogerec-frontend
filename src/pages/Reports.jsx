import React, { useState, useEffect } from 'react';
import { Warning, Description, Add, Checklist, Visibility, Download } from '@mui/icons-material';
import useRoleAccess from '../hooks/useRoleAccess';
import api from '../services/api';

const Reports = () => {
    const { isAdmin } = useRoleAccess();
    const admin = isAdmin();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reportType, setReportType] = useState('all');

    // Fetch reports from backend API
    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get('/reports');
                const data = response.data;
                // Handle paginated response
                const reportList = data.data ? data.data : (Array.isArray(data) ? data : []);
                setReports(reportList);
            } catch (err) {
                setError(err.message || 'Failed to fetch reports');
                setReports([]);
            } finally {
                setLoading(false);
            }
        };

        if (admin) {
            fetchReports();
        }
    }, [admin]);

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'completed': return '#198754';
            case 'submitted': return '#198754';
            case 'pending': return '#ffc107';
            case 'draft': return '#6c757d';
            case 'failed': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredReports = reportType === 'all' ? reports : reports.filter(r => r.type === reportType);

    if (!isAdmin()) {
        return (
            <main className="container py-5">
                <div className="alert alert-danger">
                    <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Access Denied - Admin access required
                </div>
            </main>
        );
    }

    return (
        <main className="container-fluid py-5" style={{ minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                            <div>
                                <h1 className="mb-2" style={{ color: '#3a4856', fontWeight: '700' }}>
                                    <Description sx={{ mr: 1, verticalAlign: 'middle', fontSize: 28 }} />Reports & Analytics
                                </h1>
                                <p className="text-muted mb-0">View and generate system reports</p>
                            </div>
                            <button className="btn custom-btn" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                <Add sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />Generate Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="row g-4 mb-5">
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-primary text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Total Reports</h5>
                            <p className="display-6 fw-bold">{reports.length}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-success text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Submitted</h5>
                            <p className="display-6 fw-bold">{reports.filter(r => r.status === 'submitted').length}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-warning text-dark shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Draft</h5>
                            <p className="display-6 fw-bold">{reports.filter(r => r.status === 'draft').length}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-info text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Recent</h5>
                            <p className="display-6 fw-bold">{reports.length > 0 ? Math.min(reports.length, 5) : 0}</p>
                        </div>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="alert alert-danger mb-4" role="alert">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading reports...</p>
                    </div>
                )}

                {/* Reports Table */}
                {!loading && (
                    <div className="custom-block bg-white shadow-lg p-4">
                        <h5 className="mb-4" style={{ color: '#3a4856', fontWeight: '600' }}>
                            <Checklist sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20, color: '#1299dd' }} />
                            Available Reports
                        </h5>

                        <div className="table-responsive">
                            {filteredReports.length > 0 ? (
                                <table className="table table-hover align-middle mb-0" style={{ borderColor: '#7fffd4' }}>
                                    <thead style={{ backgroundColor: 'rgba(18, 153, 221, 0.05)', borderBottom: '2px solid #7fffd4' }}>
                                        <tr>
                                            <th style={{ color: '#3a4856', fontWeight: '600' }}>#</th>
                                            <th style={{ color: '#3a4856', fontWeight: '600' }}>Intervention</th>
                                            <th style={{ color: '#3a4856', fontWeight: '600' }}>Technician</th>
                                            <th style={{ color: '#3a4856', fontWeight: '600' }}>Date Created</th>
                                            <th style={{ color: '#3a4856', fontWeight: '600' }}>Status</th>
                                            <th style={{ color: '#3a4856', fontWeight: '600' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredReports.map((report, index) => (
                                            <tr key={report.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                                <td style={{ color: '#3a4856', fontWeight: '600' }}>{index + 1}</td>
                                                <td style={{ color: '#3a4856' }}>
                                                    Intervention #{report.intervention_id}
                                                </td>
                                                <td style={{ color: '#717275', fontSize: '0.95rem' }}>
                                                    {report.technician_id ? `Technician #${report.technician_id}` : 'N/A'}
                                                </td>
                                                <td style={{ color: '#717275', fontSize: '0.95rem' }}>
                                                    {formatDate(report.created_at)}
                                                </td>
                                                <td>
                                                    <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(report.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm me-2" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                                        <Visibility sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi-file-earmark" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                                    <p className="mt-3 text-muted">No reports found</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Reports;
