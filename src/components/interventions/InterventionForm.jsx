import React, { useState } from 'react';

const InterventionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        ticket_id: '',
        user_id: '',
        description: '',
        scheduled_at: '',
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
                <label className="form-label">Ticket ID</label>
                <input type="text" className="form-control" name="ticket_id" value={formData.ticket_id} onChange={handleChange} required placeholder="Enter Ticket ID" />
            </div>
            <div className="mb-3">
                <label className="form-label">Technician ID (User ID)</label>
                <input type="text" className="form-control" name="user_id" value={formData.user_id} onChange={handleChange} required placeholder="Enter Technician ID" />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Scheduled Date</label>
                <input type="datetime-local" className="form-control" name="scheduled_at" value={formData.scheduled_at} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Schedule Intervention</button>
        </form>
    );
};

export default InterventionForm;

