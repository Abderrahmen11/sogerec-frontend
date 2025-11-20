import React from 'react';

const Footer = () => (
    <footer className="bg-dark text-white py-5 mt-5">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h6>About SogeFix</h6>
                    <p>Professional maintenance and intervention management platform.</p>
                </div>
                <div className="col-md-4">
                    <h6>Quick Links</h6>
                    <ul className="list-unstyled">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h6>Contact</h6>
                    <p>Email: info@sogefix.com<br />Phone: +1 (555) 123-4567</p>
                </div>
            </div>
            <hr className="bg-white my-4" />
            <div className="text-center">
                <p className="mb-0">&copy; 2025 SogeFix. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;

