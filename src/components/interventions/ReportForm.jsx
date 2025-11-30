import React, { useState } from 'react';

const ReportForm = ({ interventionId, onSubmit }) => {
    const [formData, setFormData] = useState({
        findings: '',
        actions_taken: '',
        recommendations: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Combine fields into a single report string for the backend
        const reportContent = `Findings: ${formData.findings}\nActions Taken: ${formData.actions_taken}\nRecommendations: ${formData.recommendations}`;

        onSubmit({
            report: reportContent,
            intervention_id: interventionId
        });
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label className="form-label">Findings</label>
                <textarea className="form-control" name="findings" value={formData.findings} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Actions Taken</label>
                <textarea className="form-control" name="actions_taken" value={formData.actions_taken} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Recommendations</label>
                <textarea className="form-control" name="recommendations" value={formData.recommendations} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Report</button>
        </form>
    );
};

export default ReportForm;

