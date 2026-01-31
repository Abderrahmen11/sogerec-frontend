import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapClickHandler = ({ onLocationSelect }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onLocationSelect(lat, lng);
        },
    });
    return null;
};

const InterventionForm = ({ onSubmit, ticketId }) => {
    const [formData, setFormData] = useState({
        ticket_id: ticketId || '',
        user_id: '',
        title: '',
        description: '',
        scheduled_at: '',
        location: '',
        latitude: '',
        longitude: '',
    });
    const [technicians, setTechnicians] = useState([]);
    const [loadingTechs, setLoadingTechs] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [mapCenter, setMapCenter] = useState([36.7538, 3.0588]); // Algiers default

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

    const handleLocationSelect = (lat, lng) => {
        setFormData(prev => ({
            ...prev,
            latitude: lat.toFixed(6),
            longitude: lng.toFixed(6),
        }));
        setMapCenter([lat, lng]);
    };

    const handleGeocoding = async (e) => {
        e.preventDefault();
        if (!formData.location) {
            alert('Please enter a location');
            return;
        }
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`
            );
            const results = await response.json();
            if (results.length > 0) {
                const { lat, lon } = results[0];
                handleLocationSelect(parseFloat(lat), parseFloat(lon));
            } else {
                alert('Location not found');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            alert('Failed to search location');
        }
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
                <label className="form-label fw-bold">Location</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter address or click on map..."
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleGeocoding}
                        disabled={isSubmitting || !formData.location}
                    >
                        Search
                    </button>
                </div>
                <small className="text-muted">Click on the map below or search for an address to set location.</small>
            </div>

            {/* Map Section */}
            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary mb-2"
                    onClick={() => setShowMap(!showMap)}
                >
                    {showMap ? 'Hide Map' : 'Show Map'}
                </button>
                {showMap && (
                    <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
                        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {formData.latitude && formData.longitude && (
                                <Marker position={[parseFloat(formData.latitude), parseFloat(formData.longitude)]}>
                                    <Popup>
                                        Location: {formData.location || `${formData.latitude}, ${formData.longitude}`}
                                    </Popup>
                                </Marker>
                            )}
                            <MapClickHandler onLocationSelect={handleLocationSelect} />
                        </MapContainer>
                    </div>
                )}
            </div>

            {formData.latitude && formData.longitude && (
                <div className="alert alert-info small">
                    <strong>Selected Location:</strong> {formData.location || 'Custom Location'} (Lat: {formData.latitude}, Lng: {formData.longitude})
                </div>
            )}

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


