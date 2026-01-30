import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Build,
    Notifications,
    Menu,
    Close,
    Dashboard,
    Assignment,
    Handyman,
    Event,
    Group,
    Article,
    Logout,
    Login,
    PersonAdd
} from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import useNotifications from '../../hooks/useNotifications';
import useRoleAccess from '../../hooks/useRoleAccess';
import ConfirmDialog from './ConfirmDialog';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();
    const { unreadCount, markAllAsRead } = useNotifications();
    const { isAdmin, isTechnician, isClient } = useRoleAccess();

    // State
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Dashboard check
    const isDashboardPage = location.pathname.includes('/dashboard');

    // Scroll Effect (Only relevant for dashboard transparency)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper: Determine Navbar Class
    const getNavbarClass = () => {
        if (!isDashboardPage) return 'navbar-solid'; // Always solid on non-dashboard
        return scrolled ? 'navbar-solid' : 'navbar-transparent'; // Dynamic on dashboard
    };

    // Navigation Links Config
    const getLinks = () => {
        const links = [];

        if (!isAuthenticated) {
            links.push({ path: '/', label: 'Home', icon: <Dashboard /> });
            links.push({ path: '/services', label: 'Services', icon: <Build /> });
            return links;
        }

        // Common for all auth users
        links.push({ path: '/dashboard', label: 'Dashboard', icon: <Dashboard /> });

        // Role Specific
        if (isClient()) {
            links.push({ path: '/tickets', label: 'My Requests', icon: <Assignment /> });
            // Clients logic for interventions usually via tickets, but if they have direct link:
            // links.push({ path: '/interventions', label: 'Interventions' }); 
        }

        if (isTechnician()) {
            links.push({ path: '/interventions', label: 'Assigned Interventions', icon: <Handyman /> });
            links.push({ path: '/planning', label: 'Planning', icon: <Event /> });
        }

        if (isAdmin()) {
            links.push({ path: '/users', label: 'Users', icon: <Group /> });
            links.push({ path: '/tickets', label: 'Tickets', icon: <Assignment /> });
            links.push({ path: '/interventions', label: 'Interventions', icon: <Handyman /> });
            links.push({ path: '/planning', label: 'Planning', icon: <Event /> });
        }

        // Common Services link for everyone? 
        links.push({ path: '/services', label: 'Services', icon: <Build /> });

        return links;
    };

    const links = getLinks();
    const isActive = (path) => location.pathname === path;

    // Handlers
    const handleLogout = async () => {
        try {
            await logout();
            setShowLogoutConfirm(false);
            setMobileOpen(false);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
    const closeMobileMenu = () => setMobileOpen(false);

    return (
        <>
            <nav className={`navbar-custom ${getNavbarClass()}`}>
                <div className="container">
                    {/* Brand */}
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="navbar-brand-custom">
                        <Build fontSize="large" />
                        <span>Sogerec</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="desktop-nav">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link-custom ${isActive(link.path) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <>
                                <Link to="/notifications" className="nav-icon-btn" onClick={markAllAsRead}>
                                    <Notifications />
                                    {unreadCount > 0 && <span className="badge-custom">{unreadCount}</span>}
                                </Link>
                                <button className="nav-icon-btn" onClick={() => setShowLogoutConfirm(true)} title="Logout">
                                    <Logout />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm btn-light text-primary fw-bold ms-2">Login</Link>
                                <Link to="/register" className="btn btn-sm btn-outline-light ms-2">Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button className="mobile-toggle-btn" onClick={toggleMobileMenu} aria-label="Toggle Menu">
                        {mobileOpen ? <Close /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div className={`drawer-backdrop ${mobileOpen ? 'visible' : ''}`} onClick={closeMobileMenu}></div>
            <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-white m-0">Menu</h4>
                    <button className="btn btn-sm text-white p-0" onClick={closeMobileMenu}><Close /></button>
                </div>

                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="mobile-nav-link"
                        onClick={closeMobileMenu}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}

                <hr className="border-light opacity-25 my-3" />

                {isAuthenticated ? (
                    <>
                        <Link to="/notifications" className="mobile-nav-link" onClick={() => { markAllAsRead(); closeMobileMenu(); }}>
                            <Notifications />
                            Notifications
                            {unreadCount > 0 && <span className="badge bg-danger ms-2">{unreadCount}</span>}
                        </Link>
                        <button className="mobile-nav-link bg-transparent border-0 w-100 text-start" onClick={() => setShowLogoutConfirm(true)}>
                            <Logout />
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>
                            <Login /> Login
                        </Link>
                        <Link to="/register" className="mobile-nav-link" onClick={closeMobileMenu}>
                            <PersonAdd /> Register
                        </Link>
                    </>
                )}
            </div>

            {/* Logout Dialog */}
            {showLogoutConfirm && (
                <ConfirmDialog
                    title="Confirm Logout"
                    message="Are you sure you want to log out?"
                    onConfirm={handleLogout}
                    onCancel={() => setShowLogoutConfirm(false)}
                />
            )}
        </>
    );
};

export default Navbar;
