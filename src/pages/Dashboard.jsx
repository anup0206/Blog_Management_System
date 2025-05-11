import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { GoBook } from "react-icons/go";
import { AiOutlinePoweroff } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("https://blog-hqx2.onrender.com/blog");
            setBlogs(response.data)
            console.log("Root:", response.data);
        } catch (error) {
            console.error("Root error:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const navitems = [
        { title: "Home", icon: <IoIosHome />, path: "/dashboard" },
        { title: "Create", icon: <IoCreateOutline />, path: "/createblogs" },
        { title: "My blogs", icon: <GoBook />, path: "/myblogs" },
    ];

    const userItems = [
        {
            title: user?.name || "Guest",
            icon: <IoPersonCircleOutline size={22} />,
            path: "/profile",
            className: "flex items-center space-x-2 px-3 py-2 rounded-xl border border-transparent hover:border-blue-600 hover:bg-blue-50 text-blue-500 transition-all duration-200",
        },
        {
            title: "Logout",
            icon: <AiOutlinePoweroff />,
            path: "/",
            className: "flex items-center space-x-2 px-3 py-2 rounded-xl border border-transparent hover:border-red-600 hover:bg-red-50 text-red-500 transition-all duration-200",
        },
    ];

    return (
        <section className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <div className="bg-white shadow-md p-4 mb-6 flex items-center border border-gray-200 justify-between">
                <div className="flex-1 text-left">
                    <h1 className="text-3xl font-bold text-blue-600 tracking-tight px-16">BlogVerse</h1>
                </div>

                <div className="flex-1 text-center">
                    <ul className="flex space-x-4 justify-center">
                        {navitems.map((item, index) => (
                            <li key={index}>
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

                <div className="flex-1 text-right px-16">
                    <ul className="flex space-x-6 items-center justify-end">
                        {userItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className={item.className}>
                                    {item.icon}
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {blogs && blogs.length > 0 ? (
                    blogs.map((val, i) => (
                        <div
                            key={i}
                            className="bg-white w-full sm:w-[48%] lg:w-[30%] p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-1">{val.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                by <span className="font-medium">{val.author.name}</span> ({val.author.email})
                            </p>
                            <img
                                src={val.image}
                                alt={val.title}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
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

            {/* Render content based on route */}
            <div className="p-4">
                <Outlet context={{ blogs }} /> {/* Pass blogs to child routes */}
            </div>
        </section>
    );
};

export default Dashboard;