import React from 'react';
import useRoleAccess from '../hooks/useRoleAccess';

const Reports = () => {
    const { isAdmin } = useRoleAccess();

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Reports</h1>
                </div>
            </div>
            {isAdmin() ? (
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <p>Admin reports coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning">You don't have permission to view reports.</div>
            )}
        </div>
    );
};

export default Reports;

