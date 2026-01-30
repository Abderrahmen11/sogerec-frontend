import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bookmark, ArrowBack } from '@mui/icons-material';
import servicesData from '../data/servicesData';

const ServiceDetails = () => {
    const { slug } = useParams();
    const service = servicesData.find(s => s.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return (
            <main>
                <div className="container py-5 text-center">
                    <h2 className="mb-4">Service Not Found</h2>
                    <p className="text-muted">The service you are looking for does not exist or has been removed.</p>
                    <Link to="/services" className="btn custom-btn mt-3">Back to Services</Link>
                </div>
            </main>
        );
    }

    return (
        <main>
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            <h2 className="text-white">{service.title}</h2>
                            <p className="text-light">{service.description}</p>
                            <div className="d-flex justify-content-center align-items-center mt-5">
                                <a href="#service-detail" className="btn custom-btn custom-border-btn smoothscroll me-4">Read Details</a>
                                <Link to="/services" className="custom-icon text-white" aria-label="Back to Services">
                                    <ArrowBack sx={{ fontSize: '1.5rem', color: '#fff' }} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <div className="topics-detail-block bg-white shadow-lg">
                                <img src={service.icon} className="topics-detail-block-image img-fluid" alt={service.title} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="topics-detail-section section-padding" id="service-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 m-auto">
                            <h3 className="mb-4">{service.title}</h3>

                            {service.content ? (
                                <div dangerouslySetInnerHTML={{ __html: service.content }} />
                            ) : (
                                <div className="alert alert-info py-4 text-center">
                                    <h5>No documentation available yet</h5>
                                    <p className="mb-0">We are currently updating the documentation for this service.</p>
                                </div>
                            )}

                            <div className="row my-5">
                                <div className="col-12 text-center">
                                    <h5 className="mb-3">Need Assistance?</h5>
                                    <Link to="/contact" className="btn custom-btn">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding section-bg">
                <div className="container">
                    <div className="row justify-content-center">

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
