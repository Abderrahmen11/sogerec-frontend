import React, { useState } from 'react';

const UserForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'client',
        password: '',
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
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Role</label>
                <select className="form-control" name="role" value={formData.role} onChange={handleChange}>
                    <option value="client">Client</option>
                    <option value="technician">Technician</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save User'}
            </button>
        </form>
    );
};

export default UserForm;

