import React from 'react';
import { Link } from 'react-router-dom';
import { Build } from '@mui/icons-material';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer section-padding">
            <div className="container">
                <div className="row">
                    {/* Logo / Brand */}
                    <div className="col-lg-3 col-12 mb-4 pb-2">
                        <Link to="/" className="navbar-brand mb-2">
                            <Build sx={{ mr: 1, verticalAlign: 'middle', fontSize: 24 }} />
                            <span>SOGELEC</span>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-3 col-md-4 col-6">
                        <h6 className="site-footer-title mb-3">Quick Links</h6>
                        <ul className="site-footer-links">
                            <li className="site-footer-link-item">
                                <Link to="/" className="site-footer-link">Home</Link>
                            </li>
                            <li className="site-footer-link-item">
                                <Link to="/dashboard" className="site-footer-link">Dashboard</Link>
                            </li>
                            <li className="site-footer-link-item">
                                <Link to="/tickets" className="site-footer-link">Tickets</Link>
                            </li>
                            <li className="site-footer-link-item">
                                <Link to="/contact" className="site-footer-link">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-3 col-md-4 col-6 mb-4 mb-lg-0">
                        <h6 className="site-footer-title mb-3">Contact Info</h6>
                        <p className="text-white d-flex mb-1">
                            <a href="tel:+216-71-000-000" className="site-footer-link">
                                +216 71 000 000
                            </a>
                        </p>
                        <p className="text-white d-flex">
                            <a href="mailto:contact@sogelec.tn" className="site-footer-link">
                                contact@sogelec.tn
                            </a>
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="col-lg-3 col-md-4 col-12 mt-4 mt-lg-0 ms-auto">
                        <p className="copyright-text mt-lg-5 mt-4">
                            © 2025 SOGELEC Tunisia. All rights reserved.
                            <br /><br />Developed for <strong>PFA Project</strong>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

