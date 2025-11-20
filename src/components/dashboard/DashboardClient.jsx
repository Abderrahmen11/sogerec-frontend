import React from 'react';

const DashboardClient = () => (
    <div className="row">
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Open Tickets</h6>
                    <h3 className="text-primary">5</h3>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Pending Interventions</h6>
                    <h3 className="text-warning">3</h3>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Completed</h6>
                    <h3 className="text-success">12</h3>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardClient;

