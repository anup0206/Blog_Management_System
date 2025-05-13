import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateBlog from "./components/CreateBlog.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import SingleblogPage from "./pages/SingleblogPage.jsx";
import MyBlog from "./pages/MyBlog.jsx";
import ProfileSection from "./components/ProfileSection.jsx";  // Import your ProfileSection
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
 const {user} =useContext(AuthContext);
  
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
            />
            <Route
              path="/singleblog/:id"
              element={
                <ProtectedRoute>
                  <SingleblogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createblogs/*"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myblogs/*"
              element={
                <ProtectedRoute>
                  <MyBlog />
                </ProtectedRoute>
              }
            />

            {/* Add Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileSection user={user} />
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
