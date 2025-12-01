import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonAdd, Warning, Edit, Delete, People } from '@mui/icons-material';
import useRoleAccess from '../hooks/useRoleAccess';
import userService from '../services/userService';

const Users = () => {
    const { isAdmin } = useRoleAccess();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        // Only fetch if we are admin and haven't loaded yet or if we want to refresh
        if (isAdmin()) {
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to run only once on mount

    const fetchUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return '#dc3545';
            case 'technician': return '#1299dd';
            case 'user': return '#0073b3';
            default: return '#6c757d';
        }
    };

    const filteredUsers = users.filter(user => {
        return filterRole === 'all' || user.role === filterRole;
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.delete(id);
                // Update state immediately to reflect change
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    if (!isAdmin()) {
        return (
            <main className="container py-5">
                <div className="alert alert-danger">
                    <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Access Denied - Admin access required
                </div>
            </main>
        );
    }

    return (
        <main className="container-fluid py-5" style={{ minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h1 className="mb-2" style={{ color: '#3a4856', fontWeight: '700' }}>Users Management</h1>
                                <p className="text-muted mb-0">
                                    {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                                </p>
                            </div>
                            <Link to="/users/create" className="btn custom-btn" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                <PersonAdd sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />Add User
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="row mb-4">
                    <div className="col-md-6 col-lg-3">
                        <label className="form-label fw-bold">Filter by Role</label>
                        <select
                            className="form-select"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            style={{ borderColor: '#7fffd4' }}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="technician">Technician</option>
                            <option value="user">Client</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="custom-block bg-white shadow-lg p-4">
                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading users...</p>
                            </div>
                        ) : filteredUsers.length > 0 ? (
                            <table className="table table-hover align-middle mb-0" style={{ borderColor: '#7fffd4' }}>
                                <thead style={{ backgroundColor: 'rgba(18, 153, 221, 0.05)', borderBottom: '2px solid #7fffd4' }}>
                                    <tr>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>#</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Name</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Email</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Role</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Status</th>
                                        <th style={{ color: '#3a4856', fontWeight: '600' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                            <td style={{ color: '#3a4856', fontWeight: '600' }}>{index + 1}</td>
                                            <td style={{ color: '#3a4856' }}>{user.name}</td>
                                            <td style={{ color: '#717275', fontSize: '0.95rem' }}>{user.email}</td>
                                            <td>
                                                <span className="badge text-white px-3 py-2" style={{ backgroundColor: getRoleBadgeColor(user.role), fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge bg-success text-white px-3 py-2" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Active</span>
                                            </td>
                                            <td>
                                                <Link to={`/users/edit/${user.id}`} className="btn btn-sm me-2" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff', fontWeight: '600' }}>
                                                    <Edit sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />Edit
                                                </Link>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff', fontWeight: '600' }}
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Delete sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-5">
                                <People sx={{ fontSize: '3rem', color: '#ccc', display: 'block', mx: 'auto', mb: 2 }} />
                                <p className="mt-3 text-muted">No users found matching your filters</p>
                                <Link to="/users/create" className="btn custom-btn mt-3" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff' }}>
                                    Create First User
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Users;
