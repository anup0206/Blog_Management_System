import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx"; // Don’t forget to import Home!

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/blogs"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
