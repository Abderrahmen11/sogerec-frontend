import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Pinterest, Bookmark } from '@mui/icons-material';

const Services = () => {
    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Homepage</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Service Listing</li>
                                </ol>
                            </nav>
                            <h2 className="text-white">Our Maintenance Services</h2>
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
                                    <img src="/images/topics/undraw_Remote_design_team_re_urdx.png" className="custom-block-image img-fluid" alt="" />
                                    <div className="custom-block-topics-listing-info d-flex">
                                        <div>
                                            <h5 className="mb-2">Electrical Maintenance</h5>
                                            <p className="mb-0">From inspections to urgent repairs, our team ensures all electrical systems are safe and fully operational.</p>
                                            <Link to="/service-details" className="btn custom-btn mt-3 mt-lg-4">Learn More</Link>
                                        </div>
                                        <span className="badge bg-design rounded-pill ms-auto">12</span>
                                    </div>
                                </div>
                            </div>

                            {/* Service 2 */}
                            <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                <div className="d-flex">
                                    <img src="/images/topics/undraw_online_ad_re_ol62.png" className="custom-block-image img-fluid" alt="" />
                                    <div className="custom-block-topics-listing-info d-flex">
                                        <div>
                                            <h5 className="mb-2">Equipment Installation</h5>
                                            <p className="mb-0">We handle installation of industrial equipment with precision, ensuring safety and compliance standards.</p>
                                            <Link to="/service-details" className="btn custom-btn mt-3 mt-lg-4">Learn More</Link>
                                        </div>
                                        <span className="badge bg-advertising rounded-pill ms-auto">18</span>
                                    </div>
                                </div>
                            </div>

                            {/* Service 3 */}
                            <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                <div className="d-flex">
                                    <img src="/images/topics/it.png" className="custom-block-image img-fluid" alt="" />
                                    <div className="custom-block-topics-listing-info d-flex">
                                        <div>
                                            <h5 className="mb-2">IT & Network Support</h5>
                                            <p className="mb-0">Our technicians provide troubleshooting, system maintenance, and IT support for smooth daily operations.</p>
                                            <Link to="/service-details" className="btn custom-btn mt-3 mt-lg-4">Learn More</Link>
                                        </div>
                                        <span className="badge bg-music rounded-pill ms-auto">25</span>
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
                                <Link to="/service-details">
                                    <div className="d-flex">
                                        <div>
                                            <h5 className="mb-2">Preventive Maintenance</h5>
                                            <p className="mb-0">Regular check-ups that reduce failures and increase the lifespan of equipment.</p>
                                        </div>
                                        <span className="badge bg-finance rounded-pill ms-auto">22</span>
                                    </div>
                                    <img src="/images/topics/undraw_Finance_re_gnv2.png" className="custom-block-image img-fluid" alt="" />
                                </Link>
                            </div>
                        </div>

                        {/* Service 5 */}
                        <div className="col-lg-6 col-md-6 col-12 mt-lg-3">
                            <div className="custom-block custom-block-overlay">
                                <div className="d-flex flex-column h-100">
                                    <img src="/images/techTeam.png" className="custom-block-image img-fluid" alt="" />
                                    <div className="custom-block-overlay-text d-flex">
                                        <div>
                                            <h5 className="text-white mb-2">Emergency Interventions</h5>
                                            <p className="text-white">Our technicians are available for urgent calls to minimize downtime and ensure quick problem resolution.</p>
                                            <Link to="/service-details" className="btn custom-btn mt-2 mt-lg-3">Learn More</Link>
                                        </div>
                                        <span className="badge bg-finance rounded-pill ms-auto">15</span>
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
