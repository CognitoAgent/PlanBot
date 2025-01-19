import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user data from session storage when the app starts
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Save user data to session storage when user state changes
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    // Logout function
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('token'); // Optional: remove token
        window.location.replace('/'); // Redirect to the home page or login
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
