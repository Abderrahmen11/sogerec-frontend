import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Build, Notifications, Person, Settings, KeyboardArrowDown, Logout, Menu, Close } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import useNotifications from '../../hooks/useNotifications';
import useRoleAccess from '../../hooks/useRoleAccess';
import useStickyNavbar from '../../hooks/useStickyNavbar';
import ConfirmDialog from './ConfirmDialog';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();
    const { unreadCount, markAllAsRead } = useNotifications();
    const { isAdmin, isTechnician } = useRoleAccess();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [navbarExpanded, setNavbarExpanded] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const dropdownRef = useRef(null);
    const isSticky = useStickyNavbar(50);
    const isDashboardPage = location.pathname.includes('/dashboard');
    const isTransparentState = isDashboardPage && !isSticky && !navbarExpanded;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleConfirmLogout = async () => {
        setShowLogoutConfirm(false);
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/login', { replace: true });
        }
    };

    const handleCancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const handleNavClick = () => {
        setDropdownOpen(false);
        // Close mobile navbar when clicking a link
        setNavbarExpanded(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar navbar-expand-lg ${isSticky ? 'navbar-sticky' : ''} ${isTransparentState ? 'navbar-transparent' : 'navbar-solid'} ${navbarExpanded ? 'navbar-expanded' : ''}`}>
            <div className="container">
                <Link className="navbar-brand" to={isAuthenticated ? "/dashboard" : "/"} onClick={handleNavClick}>
                    <Build sx={{ mr: 1, verticalAlign: 'middle' }} />
                    <span>Sogerec</span>
                </Link>

                {/* Mobile notification icon */}
                <div className="d-lg-none ms-auto me-4">
                    {isAuthenticated && (
                        <Link to="/notifications" className="navbar-icon position-relative" onClick={() => { markAllAsRead(); handleNavClick(); }}>
                            <Notifications />
                            {unreadCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                    )}
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={navbarExpanded}
                    aria-label="Toggle navigation"
                    onClick={() => setNavbarExpanded(!navbarExpanded)}
                >
                    {navbarExpanded ? <Close /> : <Menu />}
                </button>

                <div className={`collapse navbar-collapse ${navbarExpanded ? 'show' : ''}`} id="navbarNav">
                    {isAuthenticated ? (
                        <>
                            <ul className="navbar-nav ms-lg-5 me-lg-auto">
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                        to="/dashboard"
                                        onClick={handleNavClick}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${isActive('/tickets') ? 'active' : ''}`}
                                        to="/tickets"
                                        onClick={handleNavClick}
                                    >
                                        {isAdmin() ? 'Tickets Management' : 'My Requests'}
                                    </Link>
                                </li>
                                {(isAdmin() || isTechnician()) && (
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${isActive('/interventions') ? 'active' : ''}`}
                                            to="/interventions"
                                            onClick={handleNavClick}
                                        >
                                            Interventions
                                        </Link>
                                    </li>
                                )}
                                {(isAdmin() || isTechnician()) && (
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${isActive('/planning') ? 'active' : ''}`}
                                            to="/planning"
                                            onClick={handleNavClick}
                                        >
                                            Planning
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${isActive('/services') ? 'active' : ''}`}
                                        to="/services"
                                        onClick={handleNavClick}
                                    >
                                        Services
                                    </Link>
                                </li>
                                {isAdmin() && (
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                className={`nav-link ${isActive('/users') ? 'active' : ''}`}
                                                to="/users"
                                                onClick={handleNavClick}
                                            >
                                                Users
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown" ref={dropdownRef}>
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDropdownOpen(!dropdownOpen);
                                                }}
                                                aria-expanded={dropdownOpen}
                                                aria-haspopup="true"
                                            >
                                                System
                                                <KeyboardArrowDown
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        ml: 0.5,
                                                        verticalAlign: 'middle',
                                                        transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.3s ease'
                                                    }}
                                                />
                                            </a>
                                            <ul className={`dropdown-menu dropdown-menu-light ${dropdownOpen ? 'show' : ''}`}>
                                                <li>
                                                    <Link className="dropdown-item" to="/reports" onClick={handleNavClick}>
                                                        Reports
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )}
                            </ul>

                            <div className="d-none d-lg-block">
                                <Link to="/notifications" className="navbar-icon position-relative me-3" onClick={() => { markAllAsRead(); handleNavClick(); }}>
                                    <Notifications />
                                    {unreadCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={handleLogoutClick}
                                    className="navbar-icon border-0 bg-transparent text-danger desktop-logout-btn"
                                    title="Logout"
                                    aria-label="Logout"
                                >
                                    <Logout />
                                </button>
                            </div>

                            {/* Mobile logout for non-admin users */}
                            <ul className="navbar-nav d-lg-none">
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-danger w-100 text-start ps-0" onClick={handleLogoutClick}>
                                        <Logout sx={{ mr: 1, fontSize: 20 }} />
                                        <b>Logout</b>
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className="navbar-nav ms-lg-5 me-lg-auto">
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/" onClick={handleNavClick}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/services') ? 'active' : ''}`} to="/services" onClick={handleNavClick}>
                                        Services
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-none d-lg-block">
                                <Link to="/login" className="btn btn-primary me-2">Login</Link>
                                <Link to="/register" className="btn btn-secondary">Register</Link>
                            </div>
                            <ul className="navbar-nav d-lg-none">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={handleNavClick}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register" onClick={handleNavClick}>Register</Link>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
            {showLogoutConfirm && (
                <ConfirmDialog
                    title="Logout Confirmation"
                    message="Are you sure you want to log out?"
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                    confirmText="Logout"
                    cancelText="Cancel"
                />
            )}
        </nav>
    );
};

export default Navbar;
