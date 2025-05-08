import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginForm = () => {
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

    const postFormData = async(values)=>{
        try{
            await axios.post(" ",values);
            alert("User Loginz Succesfully !!!!")
        }
        catch(error){
            console.log(error)
        }

    }

    // Handle form submission
    const handleSubmit = (values, { resetForm }) => {
        postFormData(values);
        resetForm();
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Form Container */}
            <div className="w-full max-w-lg p-6 sm:p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Welcome back 
                </h2>
                <p className="text-gray-500 mb-8 text-center">
                    Build your design system effortlessly with our powerful component library.
                </p>

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
                                <label className="text-gray-600 mr-2">Remember sign in details</label>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-purple-600 focus:ring-purple-500 rounded"
                                />
                            </div>
                        </div>

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
        </div>
    );
};

export default LoginForm;