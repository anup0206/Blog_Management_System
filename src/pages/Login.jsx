import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { IoIosArrowRoundBack } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {

    const { login } = useContext(AuthContext);




    // Initial form values
    const initialValues = {
        email: "",
        password: "",
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const postData = async (values) => {
        try {
            const response = await axios.post("https://blog-hqx2.onrender.com/user/login", values);

            toast.success("User Login Successfully!");

            const { token, user } = response.data;

            console.log("Received Token:", token);
            console.log("Received User:", user);

            // ✅ Correct: Call login with received values
            login(token, user);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Login error:", error);
        }
    };


    // Handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        await postData(values);
        resetForm(); // optional: move this inside postData if you want
    };
    

    // Array of input field configurations
    const inputFields = [
        {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
        },
        {
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
        },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
            {/* Form Container */}
            <div className="w-full max-w-lg p-6 sm:p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Welcome back !
                </h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="space-y-5">
                        {/* Map over inputFields to render input elements */}
                        {inputFields.map((field) => (
                            <div key={field.id}>
                                <label
                                    htmlFor={field.id}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {field.label}
                                </label>
                                <Field
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                />
                                <ErrorMessage
                                    name={field.name}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        ))}

                        <div className="flex items-center justify-between text-sm">
                            <Link
                                to="/forgot-password"
                                className="text-purple-600 hover:text-purple-800 font-medium"
                            >
                                Forgot password?
                            </Link>
                            <div className="flex items-center">
                                <label className="text-gray-600 mr-2">Remember me </label>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-purple-600 focus:ring-purple-500 rounded"
                                />
                            </div>
                        </div>
                        <ToastContainer />

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        >
                            Log in
                        </button>

                        <div className="flex items-center w-full gap-4 my-6">
                            <hr className="flex-1 h-px bg-gray-200" />
                            <div className="text-gray-500 font-medium">OR</div>
                            <hr className="flex-1 h-px bg-gray-200" />
                        </div>

                        <button
                            type="button"
                            className="w-full bg-white border border-gray-300 p-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        >
                            <img
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span>Continue with Google</span>
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-purple-600 hover:text-purple-800 font-medium"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </Form>
                </Formik>
            </div>
            <Link
                to="/"
                className="mt-6 flex items-center text-purple-600 font-semibold transition duration-300 group relative"
            >
                <IoIosArrowRoundBack className="text-2xl group-hover:-translate-x-1 transition duration-300" />
                <span className="ml-2 group-hover:text-purple-800">
                    Back to landing page
                </span>

                {/* Underline on hover */}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left"></span>
            </Link>

        </div>
    );
};

export default LoginForm;