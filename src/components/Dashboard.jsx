import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import Navbar from "./Navbar";

const Dashboard = () => {
    // State to store the fetched blogs
    const [blogs, setBlogs] = useState([]);

    // Access the user object from the AuthContext (User authentication context)
    const { user } = useContext(AuthContext);

    // Hook to get the current location (for highlighting active menu items)
    const location = useLocation();




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

    return (
        <section className="min-h-screen bg-gray-100">
            {/* Navbar Section */}
            <Navbar />


            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 mb-8 space-y-6 md:space-y-0">
                <div className="flex flex-col space-y-6 w-full md:w-auto max-w-3xl">
                    <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                        Discover Blog Posts
                    </h1>

                    {/* Search Bar */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search blogs by title, content, or author..."
                            className="p-4 w-full rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Create New Blog Button */}
                <Link
                    to="/createblogs"
                    className="flex items-center space-x-3 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-lg focus:ring-4 focus:ring-teal-300 w-full md:w-auto"
                >
                    <IoIosAddCircleOutline className="text-2xl" />
                    <span className="font-medium text-lg">Create New Blog</span>
                </Link>
            </div>


            {/* Blog Listing Section */}
            <section className="px-4 md:px-16 py-8 bg-gradient-to-b from-gray-100 to-white">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {blogs && blogs.length > 0 ? (
                        blogs.map((val, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
                            >
                                <div className="relative w-full h-48 overflow-hidden">
                                    <img
                                        src={val.image}
                                        alt={val.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">{val.title}</h2>
                                    <p className="text-sm text-gray-600">
                                        by <span className="font-medium">{val.author.name}</span> ({val.author.email})
                                    </p>
                                    <p className="text-sm text-gray-700 line-clamp-3">{val.content}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(val.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No blogs available.</p>
                    )}
                </div>
            </section>

            {/* Render content based on the current route */}
            <div className="p-4">
                <Outlet context={{ blogs }} /> {/* Pass blogs data to child routes */}
            </div>
        </section>
    );
};

export default Dashboard;
