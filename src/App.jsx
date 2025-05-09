import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import BlogList from "./pages/BlogList.jsx";
import { useOutletContext } from "react-router-dom";

const BlogListWrapper = () => {
    const { blogs } = useOutletContext(); // Access blogs from Dashboard
    return <BlogList blogs={blogs} />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<BlogListWrapper />} />
                    <Route path="createblogs" element={<CreateBlog />} />
                    <Route path="myblogs" element={<div>My Blogs Content</div>} />
                </Route>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;