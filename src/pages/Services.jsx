import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Pinterest, Bookmark } from '@mui/icons-material';

const Services = () => {
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

                        <div className="col-lg-8 col-12 mt-3 mx-auto">
                            {/* Service 1 */}
                            <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                <div className="d-flex">
                                    <img src="/images/topics/undraw_Remote_design_team_re_urdx.png" className="custom-block-image img-fluid" alt="Electrical Maintenance" />
                                    <div className="custom-block-topics-listing-info d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-2">
                                            <h5 className="mb-0">Electrical Maintenance</h5>
                                            <span className="badge bg-primary rounded-pill ms-auto">12</span>
                                        </div>
                                        <p className="mb-0">From inspections to urgent repairs, our team ensures all electrical systems are safe and fully operational.</p>
                                        <div className="mt-auto">
                                            <Link to="/services/electrical-maintenance" className="btn custom-btn mt-3">Learn More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Service 2 */}
                            <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                <div className="d-flex">
                                    <img src="/images/topics/undraw_online_ad_re_ol62.png" className="custom-block-image img-fluid" alt="Equipment Installation" />
                                    <div className="custom-block-topics-listing-info d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-2">
                                            <h5 className="mb-0">Equipment Installation</h5>
                                            <span className="badge bg-primary rounded-pill ms-auto">18</span>
                                        </div>
                                        <p className="mb-0">We handle installation of industrial equipment with precision, ensuring safety and compliance standards.</p>
                                        <div className="mt-auto">
                                            <Link to="/services/equipment-installation" className="btn custom-btn mt-3">Learn More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Service 3 */}
                            <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                <div className="d-flex">
                                    <img src="/images/topics/it.png" className="custom-block-image img-fluid" alt="IT & Network Support" />
                                    <div className="custom-block-topics-listing-info d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-2">
                                            <h5 className="mb-0">IT & Network Support</h5>
                                            <span className="badge bg-primary rounded-pill ms-auto">25</span>
                                        </div>
                                        <p className="mb-0">Our technicians provide troubleshooting, system maintenance, and IT support for smooth daily operations.</p>
                                        <div className="mt-auto">
                                            <Link to="/services/it-network-support" className="btn custom-btn mt-3">Learn More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="col-lg-12 col-12">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center mb-0">
                                    <li className="page-item">
                                        <button className="page-link" type="button" aria-label="Previous" disabled>
                                            <span aria-hidden="true">Prev</span>
                                        </button>
                                    </li>
                                    <li className="page-item active" aria-current="page">
                                        <button className="page-link" type="button">1</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link" type="button">2</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link" type="button">3</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link" type="button" aria-label="Next" disabled>
                                            <span aria-hidden="true">Next</span>
                                        </button>
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

                        {/* Service 4 */}
                        <div className="col-lg-6 col-md-6 col-12 mt-3 mb-4 mb-lg-0">
                            <div className="custom-block bg-white shadow-lg">
                                <Link to="/services/preventive-maintenance">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h5 className="mb-2">Preventive Maintenance</h5>
                                            <p className="mb-0">Regular check-ups that reduce failures and increase the lifespan of equipment.</p>
                                        </div>
                                        <span className="badge bg-primary rounded-pill ms-auto">22</span>
                                    </div>
                                    <img src="/images/topics/undraw_Finance_re_gnv2.png" className="custom-block-image img-fluid" alt="Preventive Maintenance" />
                                </Link>
                            </div>
                        </div>

                        {/* Service 5 */}
                        <div className="col-lg-6 col-md-6 col-12 mt-lg-3">
                            <div className="custom-block custom-block-overlay">
                                <div className="d-flex flex-column h-100">
                                    <img src="/images/techTeam.png" className="custom-block-image img-fluid" alt="Emergency Interventions" />
                                    <div className="custom-block-overlay-text d-flex flex-column h-100">
                                        <div className="d-flex align-items-center mb-2">
                                            <h5 className="text-white mb-0">Emergency Interventions</h5>
                                            <span className="badge bg-primary rounded-pill ms-auto">15</span>
                                        </div>
                                        <p className="text-white">Our technicians are available for urgent calls to minimize downtime and ensure quick problem resolution.</p>
                                        <div className="mt-auto">
                                            <Link to="/services/emergency-interventions" className="btn custom-btn mt-2">Learn More</Link>
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
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Services;
