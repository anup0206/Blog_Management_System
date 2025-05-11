import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    
    if (!token) {
        navigate("/signup");
        return null;  // Optionally, you can return null or a loading spinner
    }
    return children;
};

export default ProtectedRoute;
