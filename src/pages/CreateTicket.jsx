import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useTickets from '../hooks/useTickets';

const CreateTicket = () => {
    const navigate = useNavigate();
    const { createTicket, loading, error } = useTickets();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: 'general'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTicket(formData);
            navigate('/tickets');
        } catch (err) {
            console.error('Failed to create ticket:', err);
        }
    };

    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-12">

                            <h2 className="text-white">Create New Request</h2>
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
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    className="form-control"
                                                    placeholder="Subject"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="title">Subject</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <select
                                                    name="priority"
                                                    id="priority"
                                                    className="form-select"
                                                    value={formData.priority}
                                                    onChange={handleChange}
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                    <option value="critical">Critical</option>
                                                </select>
                                                <label htmlFor="priority">Priority</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <select
                                                    name="category"
                                                    id="category"
                                                    className="form-select"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                >
                                                    <option value="general">General</option>
                                                    <option value="electrical">Electrical</option>
                                                    <option value="plumbing">Plumbing</option>
                                                    <option value="hvac">HVAC</option>
                                                    <option value="network">Network</option>
                                                </select>
                                                <label htmlFor="category">Category</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-4">
                                                <textarea
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Describe your issue"
                                                    style={{ height: '150px' }}
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                                <label htmlFor="description">Description</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button type="submit" className="form-control" disabled={loading}>
                                                {loading ? 'Submitting...' : 'Submit Request'}
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

export default CreateTicket;
