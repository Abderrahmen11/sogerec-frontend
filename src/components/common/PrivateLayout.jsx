import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const PrivateLayout = ({ children }) => (
    <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1">
            <Navbar />
            {children}
            <Footer />
        </main>
    </div>
);

export default PrivateLayout;

