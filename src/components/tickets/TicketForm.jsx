import React, { useState } from 'react';

const TicketForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
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
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Priority</label>
                <select className="form-control" name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit Ticket</button>
        </form>
    );
};

export default TicketForm;

