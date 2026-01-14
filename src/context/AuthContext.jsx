
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing cookie on mount
        const savedUser = Cookies.get('hexhive_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // HARDCODED CREDENTIALS (Client-side only)
        if (username === 'admin' && password === 'shivu31') {
            const userData = { username, role: 'admin' };
            setUser(userData);
            Cookies.set('hexhive_user', JSON.stringify(userData), { expires: 30 }); // 30 day expiry
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('hexhive_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
