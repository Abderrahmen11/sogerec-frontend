import React from 'react';
import { Link } from 'react-router-dom';
import useRoleAccess from '../../hooks/useRoleAccess';

const Sidebar = () => {
    const { isAdmin, isTechnician } = useRoleAccess();

    return (
        <aside className="sidebar">
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tickets">Tickets</Link>
                <Link to="/interventions">Interventions</Link>
                <Link to="/planning">Planning</Link>
                {(isAdmin() || isTechnician()) && <Link to="/reports">Reports</Link>}
                {isAdmin() && <Link to="/users">Users</Link>}
            </nav>
        </aside>
    );
};

export default Sidebar;

