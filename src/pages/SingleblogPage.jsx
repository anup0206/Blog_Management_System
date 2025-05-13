import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const SingleblogPage = () => {
    const [singleblog, setSingleblog] = useState(null); // Changed to null for clarity
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://blog-hqx2.onrender.com/blog/single/${id}`);
            setSingleblog(response.data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]); // Add dependency to avoid infinite loop

    if (!singleblog) {
        return (
            <div className="text-center text-gray-600 py-10">
                Loading blog post.....
            </div>
        );
    }

    return (
        <section className="px-4 md:px-16 py-8 bg-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{singleblog.title}</h1>
                <p className="text-sm text-gray-500 mb-2">
                    by <span className="font-medium">{singleblog.author?.name}</span> ({singleblog.author?.email})
                </p>
                <img
                    src={singleblog.image}
                    alt={singleblog.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{singleblog.content}</p>
                <p className="text-xs text-gray-400 mt-6">
                    Posted on: {new Date(singleblog.createdAt).toLocaleString()}
                </p>
            </div>
            
        </section>
    );
};

export default SingleblogPage;
