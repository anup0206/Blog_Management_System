import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const SingleblogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [singleblog, setSingleblog] = useState(null);
    const [blogs, setBlogs] = useState([]);

    // Fetch single blog
    const fetchSingleBlog = async () => {
        try {
            const res = await axios.get(`https://blog-hqx2.onrender.com/blog/single/${id}`);
            setSingleblog(res.data);
        } catch (err) {
            console.error("Error fetching blog:", err);
        }
    };

    // Fetch all blogs (to simulate related)
    const fetchAllBlogs = async () => {
        try {
            const res = await axios.get(`https://blog-hqx2.onrender.com/blog`);
            setBlogs(res.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    // Delete a blog
    const deleteBlogs = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`https://blog-hqx2.onrender.com/blog/${id}`);
            if (response.status === 200) {
                alert("Blog deleted successfully.");
                setMyBlog(prev => prev.filter(blog => blog._id !== id));
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    useEffect(() => {
        fetchSingleBlog();
        fetchAllBlogs();
    }, [id]);

    if (!singleblog) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-dashed"></div>
                <p className="mt-4">Loading blog post...</p>
            </div>
        );
    }

    return (
        <section className="px-4 md:px-16 py-10 bg-gradient-to-b from-gray-100 to-white min-h-screen">
            <div className="max-w-5xl mx-auto">
                <Link to="/dashboard" className="text-purple-600 font-semibold hover:text-purple-800 flex items-center mb-6">
                    <IoIosArrowRoundBack className="text-2xl mr-1" />
                    Back to Dashboard
                </Link>

                {/* Single Blog Content */}
                <h1 className="text-4xl font-bold mb-4">{singleblog.title}</h1>
                <p className="text-gray-600 mb-2">
                    by <strong>{singleblog.author?.name}</strong> ({singleblog.author?.email}) •{" "}
                    {new Date(singleblog.createdAt).toLocaleDateString()}
                </p>
                <img src={singleblog.image} alt={singleblog.title} className="w-full h-80 object-cover rounded-lg shadow mb-6" />
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">{singleblog.content}</p>
            </div>

            {/* Related Blogs */}
            <div className="mt-16 border-t pt-10 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Other Blogs</h2>

                {blogs.filter(blog => blog._id !== id).length === 0 ? (
                    <p className="text-center text-gray-500">No related posts found.</p>
                ) : (
                    <ul className="space-y-6">
                        {blogs
                            .filter(blog => blog._id !== id)
                            .map(blog => (
                                <li
                                    key={blog._id}
                                    className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
                                >
                                    {/* Blog Thumbnail */}
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-32 h-20 object-cover rounded-md flex-shrink-0 border"
                                    />

                                    {/* Blog Content */}
                                    <div className="flex-1">
                                        <Link
                                            to={`/singleblog/${blog._id}`}
                                            className="text-lg font-semibold text-purple-700 hover:underline"
                                        >
                                            {blog.title}
                                        </Link>
                                        <p className="text-sm text-gray-500 mt-1">
                                            by {blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 mt-1 line-clamp-2">
                                            {blog.content}
                                        </p>
                                    </div>

                                    {/* Edit & Delete Buttons */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => navigate(`/editblog/${blog?._id}`)}
                                            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                                        >
                                           <MdEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() =>deleteBlogs(blog?._id)}
                                            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                                        >
                                            <MdDelete />Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                    </ul>

                )}
            </div>
        </section>
    );
};

export default SingleblogPage;
