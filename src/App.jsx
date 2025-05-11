import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useOutletContext } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import CreateBlog from "./components/CreateBlog.jsx";
import BlogList from "./components/BlogList.jsx"; // Assuming you have a BlogList component.

const BlogListWrapper = () => {
    const { blogs } = useOutletContext(); // Access blogs from Dashboard
    return <BlogList blogs={blogs} />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Protected Route for Dashboard */}
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<BlogListWrapper />} />
                </Route>

                {/* Protected Route for CreateBlog */}
                <Route
                    path="/createblogs/*"
                    element={
                        <ProtectedRoute>
                            <CreateBlog />
                        </ProtectedRoute>
                    }
                />
                
                {/* Route for My Blogs */}
                <Route path="/myblogs" element={<div>BlogsList</div>} />

                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
