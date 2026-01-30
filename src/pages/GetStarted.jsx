import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Person, Shield, Build, CheckCircle } from '@mui/icons-material';
import useAuth from '../hooks/useAuth';

const GetStarted = () => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();

    // Redirect authenticated users to dashboard
    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Don't render if authenticated (will redirect)
    if (isAuthenticated) {
        return null;
    }

    const handleCarouselPrev = () => {
        setCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1));
    };

    const handleCarouselNext = () => {
        setCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1));
    };

    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#1299dd', padding: '160px 0' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-12 text-center">
                            <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>Welcome to SogeRec</h2>
                            <p style={{ color: '#f0f0f0' }}>Comprehensive facility management solutions for modern businesses.</p>
                        </div>
                    </div>
                </div>

                <div id="carouselExampleCaptions" className="carousel slide" style={{ margin: '60px 0', maxWidth: '1000px' }}>
                    <div className="carousel-indicators">
                        <button type="button" onClick={() => setCarouselIndex(0)} className={carouselIndex === 0 ? 'active' : ''} aria-current={carouselIndex === 0 ? 'true' : 'false'} aria-label="Slide 1" style={{ backgroundColor: '#fff' }}></button>
                        <button type="button" onClick={() => setCarouselIndex(1)} className={carouselIndex === 1 ? 'active' : ''} aria-label="Slide 2" style={{ backgroundColor: '#fff' }}></button>
                        <button type="button" onClick={() => setCarouselIndex(2)} className={carouselIndex === 2 ? 'active' : ''} aria-label="Slide 3" style={{ backgroundColor: '#fff' }}></button>
                    </div>

                    <div className="carousel-inner">
                        <div className={`carousel-item ${carouselIndex === 0 ? 'active' : ''}`}>
                            <img src="/images/techTeam.png" className="d-block mx-auto" alt="Tech Team" style={{ width: '1000px', maxWidth: '100%', height: '450px', objectFit: 'cover', borderRadius: '24px', backgroundColor: '#fff' }} />
                            <div className="carousel-caption d-none d-md-block" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '12px', padding: '20px' }}>
                                <h2 style={{ color: '#fff' }}>Expert Technical Team</h2>
                                <p style={{ color: '#f0f0f0' }}>Our certified technicians deliver reliable solutions for all your maintenance needs.</p>
                                <a href="#features" className="btn" style={{ backgroundColor: '#004598', color: '#fff', border: 'none' }}>Learn More</a>
                            </div>
                        </div>

                        <div className={`carousel-item ${carouselIndex === 1 ? 'active' : ''}`}>
                            <img src="/images/te.png" className="d-block mx-auto" alt="Facilities" style={{ width: '1000px', maxWidth: '100%', height: '450px', objectFit: 'cover', borderRadius: '24px', backgroundColor: '#fff' }} />
                            <div className="carousel-caption d-none d-md-block" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '12px', padding: '20px' }}>
                                <h2 style={{ color: '#fff' }}>Facilities Management</h2>
                                <p style={{ color: '#f0f0f0' }}>Efficiently manage and maintain your business facilities with SogeRec.</p>
                                <a href="#features" className="btn" style={{ backgroundColor: '#004598', color: '#fff', border: 'none' }}>See Features</a>
                            </div>
                        </div>

                        <div className={`carousel-item ${carouselIndex === 2 ? 'active' : ''}`}>
                            <img src="/images/secure.png" className="d-block mx-auto" alt="Security" style={{ width: '1000px', maxWidth: '100%', height: '450px', objectFit: 'cover', borderRadius: '24px', backgroundColor: '#fff' }} />
                            <div className="carousel-caption d-none d-md-block" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '12px', padding: '20px' }}>
                                <h2 style={{ color: '#fff' }}>Secure & Protected</h2>
                                <p style={{ color: '#f0f0f0' }}>Your data and operations are protected with our advanced security protocols.</p>
                                <a href="#contact" className="btn" style={{ backgroundColor: '#004598', color: '#fff', border: 'none' }}>Contact Us</a>
                            </div>
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" onClick={handleCarouselPrev}>
                        <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" onClick={handleCarouselNext}>
                        <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </header>



            <section className="explore-section section-padding section-bg" id="features">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-12 text-center mb-5">
                            <h2>Powerful Features</h2>
                            <p>Discover how Sogerec can transform your maintenance management process</p>
                        </div>
                    </div>
                    <div className="row">
                        {/* Feature 1 */}
                        <div className="col-lg-4 col-md-6 col-12 mb-4">
                            <div className="custom-block bg-white shadow-lg">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Ticket Management</h5>
                                        <p className="mb-0">Create, track, and manage service requests with our intuitive ticketing system.</p>
                                    </div>
                                    <span className="badge bg-design rounded-pill ms-auto">1</span>
                                </div>
                                <img src="/images/topics/undraw_Remote_design_team_re_urdx.png" className="custom-block-image img-fluid" alt="Ticket Management" />
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="col-lg-4 col-md-6 col-12 mb-4">
                            <div className="custom-block bg-white shadow-lg">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Real-time Tracking</h5>
                                        <p className="mb-0">Monitor the status of interventions in real-time with live updates.</p>
                                    </div>
                                    <span className="badge bg-design rounded-pill ms-auto">2</span>
                                </div>
                                <img src="/images/topics/undraw_Redesign_feedback_re_jvm0.png" className="custom-block-image img-fluid" alt="Real-time Tracking" />
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="col-lg-4 col-md-6 col-12 mb-4">
                            <div className="custom-block bg-white shadow-lg">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Planning & Scheduling</h5>
                                        <p className="mb-0">Efficiently plan and schedule interventions with our calendar system.</p>
                                    </div>
                                    <span className="badge bg-design rounded-pill ms-auto">3</span>
                                </div>
                                <img src="/images/topics/colleagues-working-cozy-office-medium-shot.png" className="custom-block-image img-fluid" alt="Planning & Scheduling" />
                            </div>
                        </div>
                        {/* Feature 4 */}
                        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                            <div className="custom-block bg-white shadow-lg">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Reporting & Analytics</h5>
                                        <p className="mb-0">Generate detailed reports and gain insights into your maintenance operations.</p>
                                    </div>
                                    <span className="badge bg-design rounded-pill ms-auto">4</span>
                                </div>
                                <img src="/images/topics/undraw_online_ad_re_ol62.png" className="custom-block-image img-fluid" alt="Reporting & Analytics" />
                            </div>
                        </div>
                        {/* Feature 5 */}
                        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                            <div className="custom-block bg-white shadow-lg">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Multi-role Access</h5>
                                        <p className="mb-0">Different access levels for clients, technicians, and administrators.</p>
                                    </div>
                                    <span className="badge bg-design rounded-pill ms-auto">5</span>
                                </div>
                                <img src="/images/topics/undraw_Group_video_re_btu7.png" className="custom-block-image img-fluid" alt="Multi-role Access" />
                            </div>
                        </div>
                        {/* Feature 6 */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="custom-block bg-white shadow-lg">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Mobile Responsive</h5>
                                        <p className="mb-0">Access the platform from any device, anywhere, at any time.</p>
                                    </div>
                                    <span className="badge bg-design rounded-pill ms-auto">6</span>
                                </div>
                                <img src="/images/topics/undraw_viral_tweet_gndb.png" className="custom-block-image img-fluid" alt="Mobile Responsive" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section section-padding section-bg" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <h2 className="mb-4">Get Support</h2>
                            <p>Our team is here to help you with any questions or issues you may have with Sogerec.</p>
                            <div className="mt-5">
                                <div className="support-option mb-4">
                                    <h5>Documentation</h5>
                                    <p>Browse our comprehensive guides and documentation to find answers to common questions.</p>
                                    <Link to="#" className="btn custom-btn mt-2">View Documentation</Link>
                                </div>
                                <div className="support-option mb-4">
                                    <h5>FAQs</h5>
                                    <p>Find quick answers to frequently asked questions about using Sogerec.</p>
                                    <Link to="#" className="btn custom-btn mt-2">View FAQs</Link>
                                </div>
                                <div className="support-option">
                                    <h5>Contact Us</h5>
                                    <p>Can't find what you're looking for? Reach out to our support team directly.</p>
                                    <Link to="/contact" className="btn custom-btn mt-2">Contact Support</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12 mt-5 mt-lg-0">
                            <div className="custom-block bg-white shadow-lg">
                                <h4 className="text-center mb-4">Contact Our Support Team</h4>
                                <form className="custom-form contact-form" action="#" method="post" role="form">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-floating">
                                                <input type="text" name="name" id="name" className="form-control" placeholder="Name" required="" />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-floating">
                                                <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email address" required="" />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" name="subject" id="subject" className="form-control" placeholder="Subject" required="" />
                                                <label htmlFor="subject">Subject</label>
                                            </div>
                                            <div className="form-floating">
                                                <textarea className="form-control" id="message" name="message" placeholder="Tell me about the project"></textarea>
                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="form-control">Submit</button>
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

export default GetStarted;
