import React, { createContext, useState, useCallback, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const initializeAuth = () => {
            const token = authService.getToken();
            const storedUser = authService.getCurrentUser();

            if (token && storedUser) {
                setUser(storedUser);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(email, password);
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (err) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.register(userData);
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (err) {
            setError(err.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            setError(err.message || 'Logout failed');
        } finally {
            setLoading(false);
        }
    }, []);

    const isAdmin = useCallback(() => {
        return user?.role === 'admin';
    }, [user]);

    const isTechnician = useCallback(() => {
        return user?.role === 'technician';
    }, [user]);

    const isClient = useCallback(() => {
        return user?.role === 'client' || user?.role === 'user';
    }, [user]);

    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        isAdmin,
        isTechnician,
        isClient,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;

