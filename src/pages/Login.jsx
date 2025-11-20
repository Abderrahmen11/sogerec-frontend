import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [localError, setLocalError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setLocalError(err.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-6 col-md-8 col-12">
                        <div className="auth-card">
                            <h2 className="mb-4 text-center">Login to SogeFix</h2>
                            {(error || localError) && <div className="alert alert-danger">{error || localError}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                            <p className="mt-3 text-center">
                                Don't have an account? <Link to="/register">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

