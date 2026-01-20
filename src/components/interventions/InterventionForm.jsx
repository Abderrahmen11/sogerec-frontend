import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

const InterventionForm = ({ onSubmit, ticketId }) => {
    const [formData, setFormData] = useState({
        ticket_id: ticketId || '',
        user_id: '',
        title: '',
        description: '',
        scheduled_at: '',
    });
    const [technicians, setTechnicians] = useState([]);
    const [loadingTechs, setLoadingTechs] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchTechs = async () => {
            setLoadingTechs(true);
            try {
                const data = await userService.getTechnicians();
                setTechnicians(data.data || data);
            } catch (error) {
                console.error("Failed to fetch technicians:", error);
            } finally {
                setLoadingTechs(false);
            }
        };
        fetchTechs();
    }, []);

    useEffect(() => {
        if (ticketId) {
            setFormData(prev => ({ ...prev, ticket_id: ticketId }));
        }
    }, [ticketId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            await onSubmit(formData);
        } catch (err) {
            setSubmitError(err.response?.data?.message || err.message || 'An error occurred during assignment.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm mb-4">
            {submitError && (
                <div className="alert alert-danger py-2 px-3 small mb-3 fade show" role="alert">
                    <strong>Error:</strong> {submitError}
                </div>
            )}

            {!ticketId && (
                <div className="mb-3">
                    <label className="form-label fw-bold">Ticket ID</label>
                    <input type="text" className="form-control" name="ticket_id" value={formData.ticket_id} onChange={handleChange} required placeholder="Enter Ticket ID" />
                </div>
            )}

            <div className="mb-3">
                <label className="form-label fw-bold">Intervention Title</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Hardware repair, Site visit..."
                    disabled={isSubmitting}
                />
                <small className="text-muted">Leave blank for a default title.</small>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Select Technician</label>
                <select
                    className="form-select"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                >
                    <option value="">Choose a technician...</option>
                    {loadingTechs ? (
                        <option disabled>Loading technicians...</option>
                    ) : (
                        technicians.map(tech => (
                            <option key={tech.id} value={tech.id}>
                                {tech.name} ({tech.email})
                            </option>
                        ))
                    )}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Intervention Note / Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Describe the nature of the intervention..."
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Scheduled Date & Time</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    name="scheduled_at"
                    value={formData.scheduled_at}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="d-grid mt-4">
                <button
                    type="submit"
                    className="btn btn-primary py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                    disabled={isSubmitting}
                    style={{ transition: 'all 0.3s ease' }}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Assigning...
                        </>
                    ) : (
                        'Schedule & Assign Technician'
                    )}
                </button>
            </div>
        </form>
    );
};

export default InterventionForm;


