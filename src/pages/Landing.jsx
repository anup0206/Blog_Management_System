import React from "react";
import Typewriter from "./Typewriter.jsx";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <section className="relative h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 overflow-hidden">

            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>

            {/* Light glow effect (subtle stars/particles style) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)] tracking-tight">
                    Welcome to <span className="text-yellow-300">Your BlogSpace</span>
                </h1>

                <Typewriter />

                <div className="flex gap-4  justify-center">
                    <Link to="/login"
                        className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-white text-teal-700 hover:bg-gray-100 font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300">
                        Sign Up
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Landing;
