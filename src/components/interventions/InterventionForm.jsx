import React, { useState } from 'react';

const InterventionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        description: '',
        scheduled_date: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Scheduled Date</label>
                <input type="datetime-local" className="form-control" name="scheduled_date" value={formData.scheduled_date} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea className="form-control" name="notes" value={formData.notes} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Schedule Intervention</button>
        </form>
    );
};

export default InterventionForm;

