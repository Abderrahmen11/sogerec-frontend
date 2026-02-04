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
                <label htmlFor="findings" className="form-label">Findings</label>
                <textarea id="findings" className="form-control" name="findings" value={formData.findings} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="actions_taken" className="form-label">Actions Taken</label>
                <textarea id="actions_taken" className="form-control" name="actions_taken" value={formData.actions_taken} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="recommendations" className="form-label">Recommendations</label>
                <textarea id="recommendations" className="form-control" name="recommendations" value={formData.recommendations} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Report</button>
        </form>
    );
};

export default ReportForm;

