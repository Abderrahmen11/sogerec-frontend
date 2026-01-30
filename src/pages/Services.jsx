import React, { useState } from 'react';
import { Twitter, Facebook, Pinterest, Bookmark, ExpandMore, ExpandLess } from '@mui/icons-material';
import servicesData from '../data/servicesData';

const Services = () => {
    const [expandedServiceId, setExpandedServiceId] = useState(null);

    // Separate main services and trending/extra services for layout purposes
    const mainServices = servicesData.slice(0, 3);
    const trendingService = servicesData[3];
    const emergencyService = servicesData[4];

    const toggleExpand = (serviceId) => {
        setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
    };

    return (
        <main>
            <header className="site-header hero-section d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            <h2 className="text-white">Our Maintenance Services</h2>
                            <p className="text-light">Professional, reliable, and efficient solutions for all your technical maintenance needs.</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-12 text-center">
                            <h3 className="mb-4">Popular Services</h3>
                        </div>

                        <div className="col-lg-9 col-12 mt-3 mx-auto">
                            {mainServices.map((service) => (
                                <div key={service.id} className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                    <div className="d-flex w-100 mobile-column">
                                        <div className="custom-block-image-wrap">
                                            <img src={service.icon} className="custom-block-image img-fluid" alt={service.title} />
                                        </div>
                                        <div className="custom-block-topics-listing-info d-flex flex-column w-100 p-4">
                                            <div className="d-flex align-items-center mb-2">
                                                <h5 className="mb-0">{service.title}</h5>
                                                <span className="badge bg-primary rounded-pill ms-auto">{service.count}</span>
                                            </div>
                                            <p className="mb-0">{service.description}</p>

                                            {/* Expandable Content */}
                                            {expandedServiceId === service.id && (
                                                <div className="mt-3 pt-3 border-top">
                                                    {service.content ? (
                                                        <div dangerouslySetInnerHTML={{ __html: service.content }} />
                                                    ) : (
                                                        <div className="alert alert-info">
                                                            <h6>No documentation available yet</h6>
                                                            <p className="mb-0 small">We are currently updating the documentation for this service.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-auto">
                                                <button
                                                    onClick={() => toggleExpand(service.id)}
                                                    className="btn custom-btn mt-3 d-flex align-items-center gap-2"
                                                >
                                                    {expandedServiceId === service.id ? (
                                                        <>Show Less <ExpandLess /></>
                                                    ) : (
                                                        <>Learn More <ExpandMore /></>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination - Keeping it static as per design or remove if not needed */}
                        <div className="col-lg-12 col-12">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center mb-0">
                                    <li className="page-item active" aria-current="page">
                                        <button className="page-link" type="button">1</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding section-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <h3 className="mb-4">Trending Services</h3>
                        </div>

                        {trendingService && (
                            <div className="col-lg-6 col-md-6 col-12 mt-3 mb-4 mb-lg-0">
                                <div className="custom-block bg-white shadow-lg h-100">
                                    <div className="d-flex align-items-center p-4">
                                        <div>
                                            <h5 className="mb-2">{trendingService.title}</h5>
                                            <p className="mb-0">{trendingService.description}</p>
                                        </div>
                                        <span className="badge bg-primary rounded-pill ms-auto">{trendingService.count}</span>
                                    </div>
                                    <img src={trendingService.icon} className="custom-block-image img-fluid w-100" alt={trendingService.title} style={{ height: '200px', objectFit: 'cover' }} />

                                    {expandedServiceId === trendingService.id && (
                                        <div className="p-4 border-top">
                                            {trendingService.content ? (
                                                <div dangerouslySetInnerHTML={{ __html: trendingService.content }} />
                                            ) : (
                                                <div className="alert alert-info">
                                                    <h6>No documentation available yet</h6>
                                                    <p className="mb-0 small">We are currently updating the documentation for this service.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="p-4 pt-0">
                                        <button
                                            onClick={() => toggleExpand(trendingService.id)}
                                            className="btn custom-btn w-100 d-flex align-items-center justify-content-center gap-2"
                                        >
                                            {expandedServiceId === trendingService.id ? (
                                                <>Show Less <ExpandLess /></>
                                            ) : (
                                                <>Learn More <ExpandMore /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {emergencyService && (
                            <div className="col-lg-6 col-md-6 col-12 mt-lg-3">
                                <div className="custom-block custom-block-overlay">
                                    <div className="d-flex flex-column h-100">
                                        <img src={emergencyService.icon} className="custom-block-image img-fluid" alt={emergencyService.title} />
                                        <div className="custom-block-overlay-text d-flex flex-column h-100">
                                            <div className="d-flex align-items-center mb-2">
                                                <h5 className="text-white mb-0">{emergencyService.title}</h5>
                                                <span className="badge bg-primary rounded-pill ms-auto">{emergencyService.count}</span>
                                            </div>
                                            <p className="text-white">{emergencyService.description}</p>

                                            {expandedServiceId === emergencyService.id && (
                                                <div className="mt-3 p-3 bg-white bg-opacity-10 rounded">
                                                    {emergencyService.content ? (
                                                        <div className="text-white" dangerouslySetInnerHTML={{ __html: emergencyService.content }} />
                                                    ) : (
                                                        <div className="alert alert-light">
                                                            <h6>No documentation available yet</h6>
                                                            <p className="mb-0 small">We are currently updating the documentation for this service.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-auto">
                                                <button
                                                    onClick={() => toggleExpand(emergencyService.id)}
                                                    className="btn custom-btn mt-2 d-flex align-items-center gap-2"
                                                >
                                                    {expandedServiceId === emergencyService.id ? (
                                                        <>Show Less <ExpandLess /></>
                                                    ) : (
                                                        <>Learn More <ExpandMore /></>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="social-share d-flex">
                                            <p className="text-white me-4">Share:</p>
                                            <ul className="social-icon">
                                                <li className="social-icon-item">
                                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                                        <Twitter />
                                                    </a>
                                                </li>
                                                <li className="social-icon-item">
                                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                                        <Facebook />
                                                    </a>
                                                </li>
                                                <li className="social-icon-item">
                                                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                                        <Pinterest />
                                                    </a>
                                                </li>
                                            </ul>
                                            <button type="button" className="custom-icon ms-auto" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                <Bookmark sx={{ fontSize: '1.5rem', color: '#fff' }} />
                                            </button>
                                        </div>
                                        <div className="section-overlay"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Services;
