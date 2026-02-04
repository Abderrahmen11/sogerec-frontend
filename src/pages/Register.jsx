import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'client',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setErrors({ password: 'Passwords do not match' });
            return;
        }
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setErrors({ form: err.message || 'Registration failed' });
        }
    };

    return (
        <div className="auth-container">
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-6 col-md-8 col-12">
                        <div className="auth-card">
                            <h2 className="mb-4 text-center">Create Account</h2>
                            {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
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
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                                {/* Role selection removed - automatically set to client */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            autoComplete="new-password"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ zIndex: 0 }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            className="form-control"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                            required
                                            autoComplete="new-password"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{ zIndex: 0 }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </button>
                                    </div>
                                    {errors.password && <small className="text-danger d-block mt-1">{errors.password}</small>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'Creating...' : 'Register'}
                                </button>
                            </form>
                            <p className="mt-3 text-center">
                                Already have an account? <Link to="/login">Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
