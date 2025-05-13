import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { IoCreateOutline, IoPersonCircleOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { RiQuillPenLine } from "react-icons/ri";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 790); // Initialize based on window size
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const navitems = [
        { title: "Home", icon: <IoIosHome />, path: "/dashboard" },
        { title: "Create", icon: <IoCreateOutline />, path: "/createblogs" },
        { title: "My Blogs", icon: <GoBook />, path: "/myblogs" },
    ];

    const userItems = [
        {
            title: user?.name || "Guest",
            icon: <IoPersonCircleOutline size={22} />,
            path: "/profile",
            className: "text-blue-500 hover:bg-blue-50 hover:border-blue-600",
        },
        {
            title: "Logout",
            icon: <AiOutlinePoweroff />,
            path: "/",
            className: "text-red-500 hover:bg-red-50 hover:border-red-600",
        },
    ];

    // Handle window resize to detect mobile view
    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 790;
            setIsMobile(newIsMobile);
            console.log(isMobile)
            // If switching to desktop view, ensure mobile menu is closed
            if (!newIsMobile) setMenuOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition-all duration-300"
                >
                    <RiQuillPenLine className="text-3xl text-blue-600" />
                    <span className="text-2xl md:text-3xl font-bold">
                        <span className="text-blue-600">Blog</span>
                        <span className="ml-1 text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-lg shadow-sm">Vault</span>
                    </span>
                </Link>

                {/* Hamburger Icon for mobile (visible below 790px) */}
                <div className={isMobile ? "block" : "hidden"}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-600 focus:outline-none"
                    >
                        {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
                    </button>
                </div>

                {/* Desktop Nav (visible at 790px and above) */}
                <div className={isMobile ? "hidden" : "flex items-center space-x-8"}>
                    {navitems.map((item, i) => (
                        <Link
                            key={i}
                            to={item.path}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-gray-700 hover:bg-gray-100 
                ${location.pathname === item.path ? "bg-gray-200 font-semibold" : ""}`}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    ))}
                    {userItems.map((item, i) => (
                        <Link
                            key={i}
                            to={item.path}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent transition-all ${item.className}`}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu (visible below 790px when menuOpen is true) */}
            <div
                className={menuOpen && isMobile ? "block px-4 pb-4 space-y-2 bg-gray-800 text-white" : "hidden"}
            >
                {navitems.map((item, i) => (
                    <Link
                        key={i}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-4 py-2 rounded-md text-gray-100 hover:bg-gray-600 
              ${location.pathname === item.path ? "bg-gray-600 font-semibold" : ""}`}
                    >
                        {item.icon} {item.title}
                    </Link>
                ))}
                {userItems.map((item, i) => (
                    <Link
                        key={i}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-4 py-2 rounded-md border border-transparent ${item.className}`}
                    >
                        {item.icon} {item.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;