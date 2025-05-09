import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
    // Load token and user from localStorage on first mount
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            return null;
        }
    });

    // Debug logs
    console.log("Current token:", token);
    console.log("Current user:", user);


    useEffect(()=>{
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser){
            setToken(setToken)
            setUser(JSON.parse(setUser))
        }
        

    },[])

    // Sync to localStorage whenever token or user changes
    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            console.log("Saved token and user to localStorage");
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            console.log("Cleared localStorage");
        }
    }, [token, user]);

    // Login function to update auth state
    const login = (logintoken, userDetails) => {
        console.log("Logging in with:", logintoken, userDetails);
        setToken(logintoken);
        setUser(userDetails);
    };

    // Optional: Logout function to clear auth state
    const logout = () => {
        console.log("Logging out");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
