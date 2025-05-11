import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { GoBook } from "react-icons/go";
import { AiOutlinePoweroff } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoIosAddCircleOutline } from "react-icons/io";

const Dashboard = () => {
    // State to store the fetched blogs
    const [blogs, setBlogs] = useState([]);
    // Access the user object from the AuthContext (User authentication context)
    const { user } = useContext(AuthContext);
    // Hook to get the current location (for highlighting active menu items)
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // Function to fetch blogs data from an API
    const fetchBlogs = async () => {
        try {
            // Make a GET request to fetch blogs
            const response = await axios.get("https://blog-hqx2.onrender.com/blog");
            // Set the fetched data to the state
            setBlogs(response.data);
            console.log("Root:", response.data);
        } catch (error) {
            // Handle any errors during the API call
            console.error("Root error:", error);
        }
    };

    // useEffect hook to call fetchBlogs when the component is mounted
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Define navigation items for the dashboard
    const navitems = [
        { title: "Home", icon: <IoIosHome />, path: "/dashboard" },
        { title: "Create", icon: <IoCreateOutline />, path: "/createblogs" },
        { title: "My blogs", icon: <GoBook />, path: "/myblogs" },
    ];

    // Define user-related items (profile and logout) in the navbar
    const userItems = [
        {
            title: user?.name || "Guest", // Display user's name or "Guest" if not authenticated
            icon: <IoPersonCircleOutline size={22} />,
            path: "/profile", // Path to the profile page
            className: "flex items-center space-x-2 px-3 py-2 rounded-xl border border-transparent hover:border-blue-600 hover:bg-blue-50 text-blue-500 transition-all duration-200",
        },
        {
            title: "Logout",
            icon: <AiOutlinePoweroff />,
            path: "/", // Path for logging out (could be linked to a logout function)
            className: "flex items-center space-x-2 px-3 py-2 rounded-xl border border-transparent hover:border-red-600 hover:bg-red-50 text-red-500 transition-all duration-200",
        },
    ];

    return (
        <section className="min-h-screen bg-gray-100">
            {/* Navbar Section */}
            <div className="bg-white shadow-md p-4 mb-6 flex items-center border border-gray-200 justify-between">
                {/* Logo/Brand Name */}
                <div className="flex-1 text-left">
                    <h1 className="text-3xl font-bold text-blue-600 tracking-tight px-16">BlogVault</h1>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 text-center">
                    <ul className="flex space-x-4 justify-center">
                        {navitems.map((item, index) => (
                            <li key={index}>
                                {/* Highlight active path using location.pathname */}
                                <Link
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-4 py-2 border border-transparent rounded-xl transition-all duration-200 hover:bg-gray-800/10 hover:border-gray-700 active:scale-95 ${location.pathname === item.path ? "bg-gray-200 border-gray-700" : ""
                                        }`}
                                >
                                    <span className="text-xl text-blue-500">{item.icon}</span>
                                    <span className="text-gray-900 font-medium">{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User-related Links (Profile and Logout) */}
                <div className="flex-1 text-right px-16">
                    <ul className="flex space-x-6 items-center justify-end">
                        {userItems.map((item, index) => (
                            <li key={index}>
                                {/* Render user items with dynamic styling */}
                                <Link to={item.path} className={item.className}>
                                    {item.icon}
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className="flex items-center justify-between p-16 mb-6">
                <div className="flex flex-col space-y-6 w-full max-w-3xl">
                    <h1 className="text-3xl font-semibold text-gray-800">Discover Blog Posts</h1>

                    {/* Search Bar */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search blogs by title, content, or author..."
                            className="p-4 w-full rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>
                </div>

                {/* Create New Blog Button */}
                <Link
                    to="/createblogs"
                    className="flex items-center space-x-3 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-lg focus:ring-4 focus:ring-teal-300"
                >
                    <IoIosAddCircleOutline className="text-2xl" />
                    <span className="font-medium text-lg">Create New Blog</span>
                </Link>
            </div>


            {/* Blog Listing Section */}
            <div className="flex flex-wrap justify-center gap-4">
                {blogs && blogs.length > 0 ? (
                    blogs.map((val, i) => (
                        <div
                            key={i}
                            className="bg-white w-full sm:w-[48%] lg:w-[30%] p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Render blog details */}
                            <img
                                src={val.image}
                                alt={val.title}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                            <h2 className="text-xl font-bold text-gray-800 mb-1">{val.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                by <span className="font-medium">{val.author.name}</span> ({val.author.email})
                            </p>

                            <p className="text-gray-700 mb-2">{val.content}</p>
                            <p className="text-xs text-gray-500">
                                Created at: {new Date(val.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">No blogs available.</p>
                )}
            </div>

            {/* Render content based on the current route */}
            <div className="p-4">
                <Outlet context={{ blogs }} /> {/* Pass blogs data to child routes */}
            </div>
        </section>
    );
};

export default Dashboard;
