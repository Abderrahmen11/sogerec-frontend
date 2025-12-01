import React, { useState } from 'react';
import { Warning, Description, Add, Checklist, Visibility, Download } from '@mui/icons-material';
import useRoleAccess from '../hooks/useRoleAccess';

const Reports = () => {
    const { isAdmin } = useRoleAccess();
    const [reportType, setReportType] = useState('all');

    // No backend endpoint for reports yet
    const reports = [];

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'completed': return '#198754';
            case 'pending': return '#ffc107';
            case 'failed': return '#dc3545';
            default: return '#6c757d';
        }
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
                            <h5 className="mb-2">Completed</h5>
                            <p className="display-6 fw-bold">{reports.filter(r => r.status === 'completed').length}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-warning text-dark shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Pending</h5>
                            <p className="display-6 fw-bold">{reports.filter(r => r.status === 'pending').length}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-info text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">File Types</h5>
                            <p className="display-6 fw-bold">{new Set(reports.map(r => r.type)).size}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="row mb-4">
                    <div className="col-md-6 col-lg-3">
                        <label className="form-label fw-bold">Filter by Type</label>
                        <select
                            className="form-select"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        >
                            <option value="all">All Types</option>
                            <option value="PDF">PDF</option>
                            <option value="Excel">Excel</option>
                        </select>
                    </div>
                </div>

                {/* Reports Table */}
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
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Report Name</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Type</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Date Created</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Status</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.map((report, index) => (
                                        <tr key={report.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                            <td style={{ color: '#3a4856', fontWeight: '600' }}>{index + 1}</td>
                                            <td style={{ color: '#3a4856' }}>{report.name}</td>
                                            <td>
                                                <span className="badge bg-light" style={{ color: '#1299dd', fontWeight: '600' }}>
                                                    {report.type}
                                                </span>
                                            </td>
                                            <td style={{ color: '#717275', fontSize: '0.95rem' }}>{report.dateCreated}</td>
                                            <td>
                                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getStatusBadgeColor(report.status), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm me-2" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                                    <Visibility sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />View
                                                </button>
                                                <button className="btn btn-sm" style={{ backgroundColor: '#0073b3', borderColor: '#0073b3', color: '#fff', fontWeight: '600' }}>
                                                    <Download sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />Download
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
            </div>
        </main>
    );
};

export default Reports;
