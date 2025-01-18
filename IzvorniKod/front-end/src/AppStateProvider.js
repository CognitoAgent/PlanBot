import React, { createContext, useState } from 'react';

// Create the context
export const AppStateContext = createContext();

// Create the provider component
export const AppStateProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AppStateContext.Provider value={{ user, setUser }}>
            {children}
        </AppStateContext.Provider>
    );
};