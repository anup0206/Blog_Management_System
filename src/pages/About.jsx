import React from "react";

export default function About() {
  return (
    <section className="bg-gray-900 text-gray-300 py-16 px-6 md:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Platform Overview */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-white mb-4">
              About <span className="text-indigo-500">BlogVault</span>
            </h1>
            <p className="text-sm md:text-base mb-6 leading-relaxed">
              BlogVault is a clean, minimalist blogging platform made for modern creators. Whether you're sharing your ideas, writing technical content, or managing multiple posts — this platform helps you do it with elegance and speed.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
              <li>✍️ Create and edit posts in a seamless dashboard</li>
              <li>🧠 Secure login and protected routes</li>
              <li>📃 Manage your blog list with full CRUD functionality</li>
              <li>⚙️ Built with React, Tailwind, and powerful backend tech</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
              alt="About BlogVault"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Meet the Developer */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">👨‍💻 Meet the Developer</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Hey, I’m <span className="text-indigo-400 font-semibold">Anupam</span>, a tech learner and BCA student with a passion for clean UI, powerful code, and building tools that make the web better. BlogVault is a side project crafted to sharpen my full-stack skills and serve creators like you.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">🧰 Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-gray-400">
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">React.js</div>
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">Tailwind CSS</div>
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">Python</div>
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">Express.js</div>
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">MongoDB / MySQL</div>
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">JWT Auth</div>
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">React Router</div>
            <div className="bg-gray-800 py-4 px-2 rounded-xl shadow hover:shadow-lg transition">Vite / Webpack</div>
          </div>
        </div>
      </div>
    </section>
  );
}
