import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <section className="hero-section d-flex justify-content-center align-items-center" style={{ minHeight: '90vh', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-12 mx-auto text-center">
                        <h1 className="text-white mb-3">Welcome to SogeFix</h1>
                        <h5 className="text-light mb-4">Your professional maintenance and intervention management platform</h5>
                        <div>
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="btn btn-primary me-3">Login</Link>
                                    <Link to="/register" className="btn btn-light">Register</Link>
                                </>
                            ) : (
                                <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;

