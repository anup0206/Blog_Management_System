import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    // Define initial values
    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        address: "",
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        fullname: Yup.string()
            .required("Full Name is required")
            .min(4, "Full Name must be at least 4 characters")
            .max(40, "Full Name cannot exceed 40 characters")
            .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces allowed"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        address: Yup.string().required("Address is required"),
    });

    const postFormData = async (values) => {
        try {
            await axios.post(" ", values);
            alert("User Register Succesfully !!!!")
        }
        catch (error) {
            console.log(error)
        }

    }

    // Handle submit with resetForm
    const onSubmit = (values, { resetForm }) => {

        postFormData(values);
        resetForm();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        {/* Define Fields */}
                        {[
                            {
                                name: "username",
                                label: "Full Name",
                                type: "text",
                                placeholder: "Enter your user name",
                            },
                            {
                                name: "email",
                                label: "Email",
                                type: "email",
                                placeholder: "Enter your email",
                            },
                            {
                                name: "password",
                                label: "Password",
                                type: "password",
                                placeholder: "Enter your password",
                            },
                            {
                                name: "conform password",
                                label: "Conform Password",
                                type: "conform password",
                                placeholder: "Enter your password",
                            },

                        ].map((field) => (
                            <div key={field.name} className="mb-4">
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {field.label}
                                </label>


                                <Field
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />


                                <ErrorMessage
                                    name={field.name}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        ))}
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        >
                            Create account
                        </button>
                        <div className="flex items-center w-full gap-4 my-6">
                            <hr className="flex-1 h-px bg-gray-200" />
                            <div className="text-gray-500 font-medium">OR</div>
                            <hr className="flex-1 h-px bg-gray-200" />
                        </div>

                        <button
                            className="w-full bg-white border border-gray-300 p-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            <span>Sign up with Google</span>
                        </button>
                    </Form>
                </Formik>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;