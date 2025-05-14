import React, { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Field, Form, Formik } from "formik";
import axios from "axios";

const EditBlogs = () => {
    const [image, setImage] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const handleSubmit = async (values) => {
        // const formData = new FormData();
        // formData.append("title", values?.title);
        // formData.append("content", values?.content);
        // if (image) formData.append("image", image);
        // formData.append("author", user?._id);

        try {
            await axios.put(`https://blog-hqx2.onrender.com/blog/${id}`, values);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Your Blog</h2>
            <Formik
                initialValues={{
                    title: location.state.blog.title,
                    content: location.state.blog.content,
                }}
                onSubmit={handleSubmit}
            >
                <Form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 border border-gray-200">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-700 text-lg font-semibold mb-2">
                            Blog Title
                        </label>
                        <Field
                            type="text"
                            name="title"
                            placeholder="Enter blog title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="content" className="block text-gray-700 text-lg font-semibold mb-2">
                            Content
                        </label>
                        <Field
                            as="textarea"
                            name="content"
                            placeholder="Write your blog content..."
                            className="w-full px-4 py-2 h-40 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>



                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                        >
                            Update Blog
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default EditBlogs;
