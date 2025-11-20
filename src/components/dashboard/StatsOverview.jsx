import React from 'react';

const StatsOverview = ({ stats }) => (
    <div className="row">
        {
            stats && Object.entries(stats).map(([key, value]) => (
                <div key={key} className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title text-capitalize">{key}</h6>
                            <h3 className="text-primary">{value}</h3>
                        </div >
                    </div >
                </div >
            ))
        }
    </div >
);

export default StatsOverview;

