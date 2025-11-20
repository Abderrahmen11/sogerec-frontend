import React, { useEffect, useState } from 'react';
import useInterventions from '../hooks/useInterventions';

const Planning = () => {
    const { getPlanning, loading } = useInterventions();
    const [planning, setPlanning] = useState([]);

    useEffect(() => {
        const fetchPlanning = async () => {
            try {
                const data = await getPlanning();
                setPlanning(data);
            } catch (err) {
                console.error('Failed to fetch planning:', err);
            }
        };
        fetchPlanning();
    }, []);

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Planning</h1>
                </div>
            </div>
            {loading ? (
                <div className="text-center">Loading planning...</div>
            ) : (
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <p>Planning view coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planning;

