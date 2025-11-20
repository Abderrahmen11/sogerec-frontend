import React from 'react';

const DashboardTechnicien = () => (
    <div className="row">
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Today's Schedule</h6>
                    <h3 className="text-primary">2</h3>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">In Progress</h6>
                    <h3 className="text-info">1</h3>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">Completed Today</h6>
                    <h3 className="text-success">4</h3>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardTechnicien;

