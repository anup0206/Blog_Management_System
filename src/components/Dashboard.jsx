import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import Navbar from "./Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


const categories = ["All", "Technology", "Lifestyle", "Education", "Travel"];

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { user } = useContext(AuthContext);
    const location = useLocation();

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("https://blog-hqx2.onrender.com/blog");
            setBlogs(response.data);
            setFeaturedBlogs(response.data.filter(blog => blog.featured));
        } catch (error) {
            console.error("Root error:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
            blog.title.toLowerCase().includes(lowerSearch) ||
            blog.content.toLowerCase().includes(lowerSearch) ||
            blog.author.name.toLowerCase().includes(lowerSearch);

        const matchesCategory =
            selectedCategory === "All" || blog.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <section className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 space-y-6 md:space-y-0">
                <div className="flex flex-col space-y-4 w-full md:w-auto max-w-3xl">
                    <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                        Discover Blog Posts
                    </h1>
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search blogs by title, content, or author..."
                            className="p-4 w-full rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                        />
                    </div>
                    <div className="flex space-x-2 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border ${selectedCategory === cat ? "bg-blue-500 text-white" : "bg-white text-gray-700 border-gray-300"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <Link
                    to="/createblogs"
                    className="animate-bounce flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-xl"
                >
                    <IoIosAddCircleOutline className="text-2xl" />
                    <span className="font-medium text-lg">Create New Blog</span>
                </Link>
            </div>

            {/* Featured Blogs Section */}
            <div className="px-4 md:px-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Blogs</h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    effect="fade"
                    pagination={{ clickable: true }}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="rounded-xl shadow-md"
                >
                    {featuredBlogs.map((blog, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`/singleblog/${blog._id}`} className="block relative w-full h-64 rounded-xl overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                                    <h3 className="text-xl font-bold line-clamp-2">{blog.title}</h3>
                                    <p className="text-sm">{blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <section className="px-4 md:px-16 py-8 bg-gradient-to-b from-gray-100 to-white">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((val, i) => (
                            <Link to={`/singleblog/${val._id}`} key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
                                <div className="relative w-full h-48 overflow-hidden">
                                    <img
                                        src={val.image}
                                        alt={val.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">{val.title}</h2>
                                    <p className="text-sm text-gray-600">by <span className="font-medium">{val.author.name}</span></p>
                                    <p className="text-sm text-gray-700 line-clamp-3">{val.content}</p>
                                    <p className="text-xs text-gray-400">{new Date(val.createdAt).toLocaleString()}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No blogs available.</p>
                    )}
                </div>
            </section>

            <div className="p-4">
                <Outlet context={{ blogs }} />
            </div>
        </section>
    );
};

export default Dashboard;
