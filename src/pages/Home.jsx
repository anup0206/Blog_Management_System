import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("https://blog-hqx2.onrender.com/user/blogs");
            setBlogs(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div>
            {blogs.map((val, i) => (
                <div key={i}>
                    <h2>{val.title}</h2>
                    <p>{val.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
