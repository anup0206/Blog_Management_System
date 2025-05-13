import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowRoundBack } from "react-icons/io";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Full Name is required")
      .min(4, "Full Name must be at least 4 characters")
      .max(40, "Full Name cannot exceed 40 characters")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces allowed"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      // ),
  });

  const postFormData = async (values) => {
    try {
      await axios.post("https://blog-hqx2.onrender.com/user/register", {
        name:values.name,
        email:values.email,
        password:values.password,
      });
      toast.success("User Registered Successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "User registration failed";
      toast.error(errorMessage);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create your account Here!</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            postFormData(values);
          }}
        >
          <Form>
            {[
              {
                name: "name",
                label: "Full Name",
                type: "text",
                placeholder: "Enter your full name",
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
                  aria-describedby={`${field.name}-error`}
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  id={`${field.name}-error`}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

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
                            type="button"
                            className="w-full bg-white border border-gray-300 p-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        >
                            <img
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span>Sign with Google</span>
                        </button>
          </Form>
        </Formik>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Log in here
          </Link>
        </p>
      </div>

      <Link
        to="/"
        className="mt-6 flex items-center text-purple-600 font-semibold transition duration-300 group relative"
      >
        <IoIosArrowRoundBack className="text-2xl group-hover:-translate-x-1 transition duration-300" />
        <span className="ml-2 group-hover:text-purple-800">
          Back to landing page
        </span>
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left"></span>
      </Link>
    </div>
  );
};

export default Register;
