import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });

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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </form>
    );
};

export default LoginForm;

