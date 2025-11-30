import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                    className="form-control"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="client">Client</option>
                    <option value="technician">Technician</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
            <div className="text-center">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </form>
    );
};

export default RegisterForm;

