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
    const { tickets, fetchTickets } = useTickets();
    const { interventions, fetchInterventions } = useInterventions();
    const [usersCount, setUsersCount] = useState(0);
    const [techniciansCount, setTechniciansCount] = useState(0);

    // Fetch all data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                await Promise.all([
                    userService.getAll().then(response => {
                        const users = response.data || response;
                        setUsersCount(users.length);
                        setTechniciansCount(users.filter(u => u.role === 'technician').length);
                    }),
                    fetchTickets(),
                    fetchInterventions()
                ]);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };
        fetchAllData();
    }, [fetchTickets, fetchInterventions]);

    const openTicketsCount = tickets ? tickets.filter(t => t.status === 'open').length : 0;

    // Chart Data - matching native HTML exactly
    const requestsChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Requests',
            data: [12, 19, 14, 20, 16, 25, 22],
            borderColor: '#0d6efd',
            fill: false
        }]
    };

    const techChartData = {
        labels: ['Ahmed', 'Amine', 'Karim', 'Sami'],
        datasets: [{
            label: 'Tasks Completed',
            data: [12, 9, 7, 15],
            backgroundColor: '#198754'
        }]
    };

    const categoryChartData = {
        labels: ['Electrical', 'Networking', 'Plumbing', 'Others'],
        datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545']
        }]
    };

    return (
        <div id="admin-dashboard">

            {/* DASHBOARD CONTENT */}
            <main className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        {/* Summary Cards */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-primary text-white shadow-lg p-4 h-100 text-center">
                                <h5 className="mb-2">Total Clients</h5>
                                <p className="display-6 fw-bold">{usersCount}</p>
                                <span className="badge bg-light text-primary">Active</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-success text-white shadow-lg p-4 h-100 text-center">
                                <h5 className="mb-2">Technicians</h5>
                                <p className="display-6 fw-bold">{techniciansCount}</p>
                                <span className="badge bg-light text-success">On Duty</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-warning text-dark shadow-lg p-4 h-100 text-center">
                                <h5 className="mb-2">Open Requests</h5>
                                <p className="display-6 fw-bold">{openTicketsCount}</p>
                                <span className="badge bg-light text-warning">Pending</span>
                            </div>
                        </div>

                        {/* Chart: Requests */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Service Requests Overview</h5>
                                <Line data={requestsChartData} />
                            </div>
                        </div>

                        {/* Chart: Technicians */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Technician Performance</h5>
                                <Bar data={techChartData} />
                            </div>
                        </div>

                        {/* Chart: Categories */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Requests by Category</h5>
                                <Pie data={categoryChartData} />
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block bg-white shadow-lg p-4 h-100">
                                <h5 className="mb-3">Recent Notifications</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">🔔 New client request submitted.</li>
                                    <li className="list-group-item">🔧 Technician Ahmed completed intervention #124.</li>
                                    <li className="list-group-item">📊 Monthly report generated.</li>
                                    <li className="list-group-item">👤 New user registered: Client – Mohamed.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Orders (Interventions) */}
                        <div className="col-12">
                            <div className="custom-block bg-white shadow-lg p-4">
                                <h5 className="mb-3">Active Interventions</h5>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Request ID</th>
                                            <th>Status</th>
                                            <th>Technician</th>
                                            <th>Client</th>
                                            <th>Location</th>
                                            <th>Start Date</th>
                                            <th>Expected Finish</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {interventions && interventions.length > 0 ? (
                                            interventions.slice(0, 3).map(intervention => (
                                                <tr key={intervention.id}>
                                                    <td>#{intervention.id}</td>
                                                    <td>
                                                        <span className={`badge bg-${intervention.status === 'completed' ? 'success' :
                                                            intervention.status === 'in_progress' ? 'warning' : 'danger'
                                                            }`}>
                                                            {intervention.status}
                                                        </span>
                                                    </td>
                                                    <td>{intervention.technician?.name || 'N/A'}</td>
                                                    <td>{intervention.ticket?.user?.name || 'N/A'}</td>
                                                    <td>{intervention.location || 'N/A'}</td>
                                                    <td>{intervention.start_date ? new Date(intervention.start_date).toLocaleDateString() : '-'}</td>
                                                    <td>{intervention.end_date ? new Date(intervention.end_date).toLocaleDateString() : '-'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center">No active interventions found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
