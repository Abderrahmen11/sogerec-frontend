import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <>
            {/* HEADER */}
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-12">

                            <h2 className="text-white">Contact Us</h2>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTACT FORM */}
            <section className="section-padding section-bg">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-12">
                            <h3 className="mb-4 pb-2">We’re here to help you</h3>
                            <p className="mb-5">If you have any questions about our maintenance services or need technical
                                assistance, please fill out the form below.</p>
                        </div>

                        <div className="col-lg-6 col-12">
                            <form action="#" method="post" className="custom-form contact-form" role="form">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="form-floating">
                                            <input type="text" name="name" id="name" className="form-control" placeholder="Name" required />
                                            <label htmlFor="name">Name</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="form-floating">
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required />
                                            <label htmlFor="email">Email address</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-12">
                                        <div className="form-floating">
                                            <input type="text" name="subject" id="subject" className="form-control" placeholder="Subject" required />
                                            <label htmlFor="subject">Subject</label>
                                        </div>

                                        <div className="form-floating">
                                            <textarea className="form-control" id="message" name="message" placeholder="Your message"></textarea>
                                            <label htmlFor="message">Your Message</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12 ms-auto">
                                        <button type="submit" className="form-control">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-5 col-12 mx-auto mt-5 mt-lg-0">
                            <iframe
                                className="google-map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15706.300544441256!2d10.1815323!3d36.80649355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd35c2fd7c0c73%3A0xe6aa0f1f056bd49c!2sSOGELEC%20Tunisie!5e1!3m2!1sfr!2stn!4v1755780870084!5m2!1sfr!2stn"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="SOGELEC Location"
                            ></iframe>

                            <h5 className="mt-4 mb-2">SOGELEC Tunisia</h5>
                            <p>Ariana, Tunisia</p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
