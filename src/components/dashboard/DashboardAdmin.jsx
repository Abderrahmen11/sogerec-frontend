import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import useAuth from '../../hooks/useAuth';
import useTickets from '../../hooks/useTickets';
import useInterventions from '../../hooks/useInterventions';
import userService from '../../services/userService';
import AnimatedNumber from '../common/AnimatedNumber';
import './DashboardStyles.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardAdmin = () => {
    const { user } = useAuth();
    const { interventions, fetchInterventions } = useInterventions();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.getStats();
            // Backend returns { success: true, data: { ... } }
            setStats(response.data);
            await fetchInterventions();
        } catch (err) {
            console.error("Error fetching dashboard data", err);
            const errorMessage = err.response?.data?.message || "Failed to load dashboard data. Please try again later.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all data
    useEffect(() => {
        fetchAllData();
    }, [fetchInterventions]);

    if (loading) return (
        <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Analyzing system statistics...</p>
        </div>
    );

    if (error) return (
        <div className="container mt-5">
            <div className="alert alert-danger shadow-sm border-0 d-flex flex-column align-items-center p-5">
                <h4 className="alert-heading mb-3">Dashboard Error</h4>
                <p>{error}</p>
                <hr className="w-100" />
                <button
                    className="btn btn-outline-danger px-4 mt-3"
                    onClick={fetchAllData}
                >
                    Retry Loading Data
                </button>
            </div>
        </div>
    );

    const requestsChartData = {
        labels: stats?.charts?.requests?.labels || [],
        datasets: [{
            label: 'Requests',
            data: stats?.charts?.requests?.data || [],
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    const techChartData = {
        labels: stats?.charts?.technicians?.labels || [],
        datasets: [{
            label: 'Interventions Completed',
            data: stats?.charts?.technicians?.data || [],
            backgroundColor: '#198754'
        }]
    };

    const categoryChartData = {
        labels: stats?.charts?.categories?.labels || [],
        datasets: [{
            data: stats?.charts?.categories?.data || [],
            backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6610f2', '#fd7e14']
        }]
    };

    return (
        <div id="admin-dashboard" className="fade-in">
            <main className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        {/* Summary Cards */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-primary text-white shadow-lg p-4 h-100 text-center border-0">
                                <h5 className="mb-2 opacity-75">Total Clients</h5>
                                <p className="display-6 fw-bold mb-0">
                                    <AnimatedNumber value={stats?.stats?.usersCount || 0} />
                                </p>
                                <span className="small opacity-50">Active in system</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-success text-white shadow-lg p-4 h-100 text-center border-0">
                                <h5 className="mb-2 opacity-75">Technicians</h5>
                                <p className="display-6 fw-bold mb-0">
                                    <AnimatedNumber value={stats?.stats?.techniciansCount || 0} />
                                </p>
                                <span className="small opacity-50">Operational staff</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-warning text-dark shadow-lg p-4 h-100 text-center border-0">
                                <h5 className="mb-2 opacity-75">Open Requests</h5>
                                <p className="display-6 fw-bold mb-0">
                                    <AnimatedNumber value={stats?.stats?.openTicketsCount || 0} />
                                </p>
                                <span className="small opacity-50">Requiring attention</span>
                            </div>
                        </div>

                        {/* Chart: Requests */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-0">
                                <h5 className="mb-4 fw-bold">Service Requests (Last 7 Days)</h5>
                                <Line data={requestsChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                            </div>
                        </div>

                        {/* Chart: Technicians */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-0">
                                <h5 className="mb-4 fw-bold">Technician Performance</h5>
                                <Bar data={techChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                            </div>
                        </div>

                        {/* Chart: Categories */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-0">
                                <h5 className="mb-4 fw-bold">Requests by Category</h5>
                                <div style={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
                                    <Pie data={categoryChartData} options={{ responsive: true }} />
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100 border-0">
                                <h5 className="mb-4 fw-bold">Recent Activity</h5>
                                <ul className="list-group list-group-flush">
                                    {stats?.notifications && stats.notifications.length > 0 ? (
                                        stats.notifications.map((note, index) => (
                                            <li key={index} className="list-group-item border-0 ps-0 py-3">
                                                <div className="d-flex">
                                                    <span className="me-3 text-primary">●</span>
                                                    <span className="text-muted small" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{note}</span>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item border-0 ps-0 text-muted italic">No recent activity detected.</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Active Interventions */}
                        <div className="col-12">
                            <div className="custom-block bg-white shadow-lg p-4 border-0">
                                <h5 className="mb-4 fw-bold">Recent Interventions</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0 mobile-responsive-table">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="border-0">ID</th>
                                                <th className="border-0">Status</th>
                                                <th className="border-0">Technician</th>
                                                <th className="border-0">Ticket</th>
                                                <th className="border-0 text-end">Scheduled</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {interventions && interventions.length > 0 ? (
                                                interventions.slice(0, 10).map(intervention => (
                                                    <tr key={intervention.id}>
                                                        <td data-label="ID" className="fw-bold">#{intervention.id}</td>
                                                        <td data-label="Status">
                                                            <span className={`badge px-3 rounded-pill bg-${intervention.status === 'completed' ? 'success' :
                                                                intervention.status === 'in_progress' ? 'warning' : 'primary'
                                                                }`} style={{ textTransform: 'capitalize' }}>
                                                                {intervention.status?.replace('_', ' ')}
                                                            </span>
                                                        </td>
                                                        <td data-label="Technician" className="text-muted">{intervention.user?.name || 'N/A'}</td>
                                                        <td data-label="Ticket" style={{ minWidth: '200px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                                            {intervention.ticket?.title || 'N/A'}
                                                        </td>
                                                        <td data-label="Scheduled" className="text-end text-muted small">{intervention.scheduled_at ? new Date(intervention.scheduled_at).toLocaleDateString() : '-'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-5 text-muted">No interventions found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
