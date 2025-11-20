import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
            <h1 className="display-1" style={{ color: 'var(--primary-color)' }}>404</h1>
            <h2>Page Not Found</h2>
            <p className="mb-4">The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    </div>
);

export default NotFound;

