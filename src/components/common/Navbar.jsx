import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useNotifications from '../../hooks/useNotifications';
import './Navbar.css';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const { unreadCount } = useNotifications();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/login', { replace: true });
        }
    };

    const handleNavClick = () => {
        // Close dropdown when navigating
        setDropdownOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-sticky">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavClick}>
                    <BuildIcon style={{ marginRight: 8 }} />
                    <span>SogeFix</span>
                </Link>

                <div className="d-lg-none ms-auto me-4">
                    {isAuthenticated && (
                        <Link to="/notifications" className="text-reset" onClick={handleNavClick}>
                            <IconButton color="inherit" size="large" aria-label="notifications">
                                <Badge badgeContent={unreadCount} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    )}
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {isAuthenticated ? (
                        <>
                            <ul className="navbar-nav ms-lg-5 me-lg-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard" onClick={handleNavClick}>Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tickets" onClick={handleNavClick}>My Requests</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/interventions" onClick={handleNavClick}>Interventions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/planning" onClick={handleNavClick}>Planning</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reports" onClick={handleNavClick}>Reports</Link>
                                </li>
                            </ul>

                            <div className="d-none d-lg-flex align-items-center">
                                <Link to="/notifications" className="text-reset me-3" onClick={handleNavClick}>
                                    <IconButton color="inherit" size="large" aria-label="notifications">
                                        <Badge badgeContent={unreadCount} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Link>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-link dropdown-toggle text-decoration-none"
                                        type="button"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <AccountCircle style={{ fontSize: 28 }} />
                                    </button>
                                    <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}>
                                        <li className="dropdown-header">{user?.name || 'User'}</li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/profile" onClick={handleNavClick}>Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/settings" onClick={handleNavClick}>Settings</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="d-none d-lg-block ms-auto">
                            <Link to="/login" className="btn btn-primary me-2">Login</Link>
                            <Link to="/register" className="btn btn-secondary">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

