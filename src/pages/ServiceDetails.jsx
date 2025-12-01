import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from '@mui/icons-material';

const ServiceDetails = () => {
    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-5 col-12 mb-5">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Homepage</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Maintenance Service</li>
                                </ol>
                            </nav>
                            <h2 className="text-white">Detailed Guide to <br /> Technical Maintenance</h2>
                            <div className="d-flex align-items-center mt-5">
                                <a href="#service-detail" className="btn custom-btn custom-border-btn smoothscroll me-4">Read More</a>
                                <a href="#top" className="custom-icon smoothscroll">
                                    <Bookmark sx={{ fontSize: '1.5rem', color: '#fff' }} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <div className="topics-detail-block bg-white shadow-lg">
                                <img src="/images/topics/undraw_Remote_design_team_re_urdx.png" className="topics-detail-block-image img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="topics-detail-section section-padding" id="service-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 m-auto">
                            <h3 className="mb-4">Maintenance & Intervention Services</h3>
                            <p>At <strong>SOGELEC Tunisia</strong>, we provide complete solutions for technical interventions, repair requests, and preventive maintenance. Our platform makes it easier for clients to submit requests, track progress, and get quick assistance from technicians.</p>
                            <p><strong>Our approach ensures reliability and transparency</strong>. Every intervention is logged in the system, so clients and administrators can follow up in real time.</p>
                            <blockquote>
                                Effective maintenance today prevents costly breakdowns tomorrow.
                            </blockquote>
                            <div className="row my-4">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <img src="/images/secure.png" className="topics-detail-block-image img-fluid" alt="" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 mt-4 mt-lg-0 mt-md-0">
                                    <img src="/images/te.png" className="topics-detail-block-image img-fluid" alt="" />
                                </div>
                            </div>
                            <p>Our services cover a wide range of equipment and electrical systems. Whether it’s preventive checks or urgent repairs, our skilled technicians ensure minimal downtime and efficient service delivery.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-12">
                            <img src="/images/te.png" className="newsletter-image img-fluid" alt="" />
                        </div>
                        <div className="col-lg-5 col-12 subscribe-form-wrap d-flex justify-content-center align-items-center">
                            <form className="custom-form subscribe-form" action="#" method="post" role="form">
                                <h4 className="mb-4 pb-2">Subscribe for Updates</h4>
                                <input type="email" name="subscribe-email" id="subscribe-email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email Address" required="" />
                                <div className="col-lg-12 col-12">
                                    <button type="submit" className="form-control">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ServiceDetails;
