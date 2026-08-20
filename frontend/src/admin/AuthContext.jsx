import React, { useState, useEffect, useCallback } from 'react';
import { authService } from '../services';
import { AuthContext } from './authContextValue';

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = useCallback(async () => {
        const token = localStorage.getItem('portfolio_admin_token');
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const res = await authService.getProfile();
            setAdmin(res.data);
        } catch {
            localStorage.removeItem('portfolio_admin_token');
            localStorage.removeItem('portfolio_admin_refresh_token');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const login = async (email, password) => {
        const res = await authService.login(email, password);
        localStorage.setItem('portfolio_admin_token', res.data.accessToken);
        localStorage.setItem('portfolio_admin_refresh_token', res.data.refreshToken);
        setAdmin(res.data.admin);
        return res;
    };

    const logout = () => {
        localStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_refresh_token');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
};
