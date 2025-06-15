import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext(null);

// Create the Provider component
export const AuthProvider = ({ children }) => {
    

  
    // The value provided to consuming components
    return {
        user
    };

};

