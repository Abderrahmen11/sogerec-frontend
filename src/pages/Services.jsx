import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Pinterest, Bookmark } from '@mui/icons-material';
import servicesData from '../data/servicesData';

const Services = () => {
    // Separate main services and trending/extra services for layout purposes
    const mainServices = servicesData.slice(0, 3);
    const trendingService = servicesData[3];
    const emergencyService = servicesData[4];

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
                                            <div className="mt-auto">
                                                <Link to={`/services/${service.slug}`} className="btn custom-btn mt-3">Learn More</Link>
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
                                    <Link to={`/services/${trendingService.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="d-flex align-items-center p-4">
                                            <div>
                                                <h5 className="mb-2">{trendingService.title}</h5>
                                                <p className="mb-0">{trendingService.description}</p>
                                            </div>
                                            <span className="badge bg-primary rounded-pill ms-auto">{trendingService.count}</span>
                                        </div>
                                        <img src={trendingService.icon} className="custom-block-image img-fluid w-100" alt={trendingService.title} style={{ height: '200px', objectFit: 'cover' }} />
                                    </Link>
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
                                            <div className="mt-auto">
                                                <Link to={`/services/${emergencyService.slug}`} className="btn custom-btn mt-2">Learn More</Link>
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
