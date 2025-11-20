import React from 'react';

const DashboardAdmin = () => (
    <div className="row">
        <div className="col-md-3 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Total Users</h6>
                    <h3 className="text-primary">48</h3>
                </div>
            </div>
        </div>
        <div className="col-md-3 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Open Tickets</h6>
                    <h3 className="text-warning">16</h3>
                </div>
            </div>
        </div>
        <div className="col-md-3 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Active Interventions</h6>
                    <h3 className="text-info">8</h3>
                </div>
            </div>
        </div>
        <div className="col-md-3 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Completed</h6>
                    <h3 className="text-success">156</h3>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardAdmin;

