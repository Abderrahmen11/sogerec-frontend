import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'client',
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
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;

