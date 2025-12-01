import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import userService from '../services/userService';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', // Only for create
        role: 'client', // Default role
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await userService.getById(id);
            // Populate form, excluding password
            setFormData({
                name: data.name || '',
                email: data.email || '',
                role: data.role || 'client',
                phone: data.phone || '',
                address: data.address || '',
                password: '' // Don't populate password
            });
        } catch (err) {
            setError('Failed to fetch user details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                // For update, remove password if empty (optional update)
                const dataToUpdate = { ...formData };
                if (!dataToUpdate.password) delete dataToUpdate.password;
                await userService.update(id, dataToUpdate);
            } else {
                await userService.create(formData);
            }
            navigate('/users');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save user');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !formData.name) {
        return <div className="container mt-5 text-center"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Homepage</Link></li>
                                    <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{isEditMode ? 'Edit User' : 'Create User'}</li>
                                </ol>
                            </nav>
                            <h2 className="text-white">{isEditMode ? 'Edit User' : 'Add New User'}</h2>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-padding section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-12">
                            <div className="custom-block bg-white shadow-lg p-4">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form onSubmit={handleSubmit} className="custom-form contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="name">Full Name</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="email">Email address</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <select
                                                    name="role"
                                                    id="role"
                                                    className="form-select"
                                                    value={formData.role}
                                                    onChange={handleChange}
                                                >
                                                    <option value="client">Client</option>
                                                    <option value="technician">Technician</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <label htmlFor="role">Role</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required={!isEditMode}
                                                />
                                                <label htmlFor="password">{isEditMode ? 'New Password (optional)' : 'Password'}</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    className="form-control"
                                                    placeholder="Phone Number"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="phone">Phone Number</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-4">
                                                <textarea
                                                    className="form-control"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Address"
                                                    style={{ height: '100px' }}
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                ></textarea>
                                                <label htmlFor="address">Address</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button type="submit" className="form-control" disabled={loading}>
                                                {loading ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User')}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UserForm;
