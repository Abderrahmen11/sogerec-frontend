import React, { useEffect } from 'react';
import useInterventions from '../hooks/useInterventions';
import InterventionList from '../components/interventions/InterventionList';

const Interventions = () => {
    const { fetchInterventions, interventions, loading } = useInterventions();

    useEffect(() => {
        fetchInterventions();
    }, []);

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Interventions</h1>
                        <button className="btn btn-primary">Schedule Intervention</button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="text-center">Loading interventions...</div>
            ) : (
                <InterventionList interventions={interventions} />
            )}
        </div>
    );
};

export default Interventions;

