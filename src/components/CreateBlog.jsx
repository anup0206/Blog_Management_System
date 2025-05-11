import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CreateBlog = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const initialValues = {
        title: "",
        content: "",
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Blog Title is required"),
        content: Yup.string()
            .required("Content is required")
            .min(6, "Must be at least 6 characters"),
    });

    const handleSubmit = async (values) => {
        const formdata = new FormData();
        formdata.append("title", values.title);
        formdata.append("content", values.content);
        formdata.append("author", user._id);

        if (values["image-upload"]) {
            formdata.append("image", values["image-upload"]);
        }

        try {
            const response = await axios.post(
                "https://blog-hqx2.onrender.com/blog/create",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert("Blog Created Successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error creating blog:", error.response || error.message || error);
            alert(error.response?.data?.message || "Something went wrong. Try again.");
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-8">
                <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800">
                    Craft Your New Post
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-6">
                            {/* Blog Title */}
                            <div>
                                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                    Blog Title
                                </label>
                                <Field
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter a catchy title"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Content */}
                            <div>
                                <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                                    Your Content
                                </label>
                                <Field
                                    id="content"
                                    name="content"
                                    as="textarea"
                                    rows="5"
                                    placeholder="Share your story..."
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                                />
                                <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* File Upload */}
                            <div>
                                <label htmlFor="image-upload" className="block text-gray-700 font-semibold mb-2">
                                    Featured Image
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <input
                                        id="image-upload"
                                        name="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            setFieldValue("image-upload", event.currentTarget.files[0])
                                        }
                                        className="mx-auto"
                                    />
                                    <p className="mt-2 text-sm text-gray-500">
                                        Upload a <span className="text-blue-600 font-medium">file</span> or drag and drop<br />
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                            >
                                📤 Publish Blog
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default CreateBlog;
