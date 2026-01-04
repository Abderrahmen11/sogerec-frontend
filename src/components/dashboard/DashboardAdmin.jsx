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
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import useAuth from '../../hooks/useAuth';
import useTickets from '../../hooks/useTickets';
import useInterventions from '../../hooks/useInterventions';
import userService from '../../services/userService';
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
    Legend
);

const DashboardAdmin = () => {
    const { user } = useAuth();
    const { interventions, fetchInterventions } = useInterventions();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all data
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const statsData = await userService.getStats();
                setStats(statsData);
                await fetchInterventions();
            } catch (err) {
                console.error("Error fetching dashboard data", err);
                setError("Failed to load dashboard data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [fetchInterventions]);

    if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" role="status"></div><p className="mt-2">Loading statistics...</p></div>;
    if (error) return <div className="alert alert-danger m-5">{error}</div>;

    const requestsChartData = {
        labels: stats.charts.requests.labels,
        datasets: [{
            label: 'Requests',
            data: stats.charts.requests.data,
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    const techChartData = {
        labels: stats.charts.technicians.labels,
        datasets: [{
            label: 'Interventions Completed',
            data: stats.charts.technicians.data,
            backgroundColor: '#198754'
        }]
    };

    const categoryChartData = {
        labels: stats.charts.categories.labels,
        datasets: [{
            data: stats.charts.categories.data,
            backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6610f2', '#fd7e14']
        }]
    };

    return (
        <div id="admin-dashboard">
            <main className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        {/* Summary Cards */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-primary text-white shadow-lg p-4 h-100 text-center">
                                <h5 className="mb-2">Total Clients</h5>
                                <p className="display-6 fw-bold">{stats.stats.usersCount}</p>
                                <span className="badge bg-light text-primary">Active</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-success text-white shadow-lg p-4 h-100 text-center">
                                <h5 className="mb-2">Technicians</h5>
                                <p className="display-6 fw-bold">{stats.stats.techniciansCount}</p>
                                <span className="badge bg-light text-success">On Duty</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-warning text-dark shadow-lg p-4 h-100 text-center">
                                <h5 className="mb-2">Open Requests</h5>
                                <p className="display-6 fw-bold">{stats.stats.openTicketsCount}</p>
                                <span className="badge bg-light text-warning">Pending</span>
                            </div>
                        </div>

                        {/* Chart: Requests */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Service Requests (Last 7 Days)</h5>
                                <Line data={requestsChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                            </div>
                        </div>

                        {/* Chart: Technicians */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Technician Performance</h5>
                                <Bar data={techChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                            </div>
                        </div>

                        {/* Chart: Categories */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Requests by Category</h5>
                                <div style={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
                                    <Pie data={categoryChartData} options={{ responsive: true }} />
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Recent Activity</h5>
                                <ul className="list-group list-group-flush">
                                    {stats.notifications && stats.notifications.length > 0 ? (
                                        stats.notifications.map((note, index) => (
                                            <li key={index} className="list-group-item border-0 ps-0">
                                                <span className="me-2">🔔</span> {note}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item border-0 ps-0">No recent activity.</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Active Interventions */}
                        <div className="col-12">
                            <div className="custom-block bg-white shadow-lg p-4">
                                <h5 className="mb-3">Recent Interventions</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Status</th>
                                                <th>Technician</th>
                                                <th>Ticket</th>
                                                <th>Scheduled</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {interventions && interventions.length > 0 ? (
                                                interventions.slice(0, 5).map(intervention => (
                                                    <tr key={intervention.id}>
                                                        <td>#{intervention.id}</td>
                                                        <td>
                                                            <span className={`badge bg-${intervention.status === 'completed' ? 'success' :
                                                                intervention.status === 'in_progress' ? 'warning' : 'primary'
                                                                }`}>
                                                                {intervention.status}
                                                            </span>
                                                        </td>
                                                        <td>{intervention.user?.name || 'N/A'}</td>
                                                        <td>{intervention.ticket?.title || 'N/A'}</td>
                                                        <td>{intervention.scheduled_at ? new Date(intervention.scheduled_at).toLocaleDateString() : '-'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No interventions found.</td>
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
