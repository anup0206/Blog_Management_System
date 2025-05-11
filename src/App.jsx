import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateBlog from "./components/CreateBlog.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx"; // ✅ Import About
import { useOutletContext } from "react-router-dom";
import Myblogs from "./components/Myblogs.jsx";

const BlogListWrapper = () => {
    const { blogs } = useOutletContext();
    return <Myblogs blogs={blogs} />;
};

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    <Routes>
                        {/* Protected Routes */}
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

                        <Route
                            path="/createblogs/*"
                            element={
                                <ProtectedRoute>
                                    <CreateBlog />
                                </ProtectedRoute>
                            }
                        />

                        {/* Public Routes */}
                        <Route path="/myblogs" element={<div>BlogsList</div>} />
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/about" element={<About />} /> {/* ✅ Add About route */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
