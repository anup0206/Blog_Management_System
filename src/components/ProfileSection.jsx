import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileSection = ({ user }) => {
  // State to hold user's blogs
  const [blogs, setBlogs] = useState([]);

  // State to track if we're editing the profile
  const [editing, setEditing] = useState(false);

  // Local state to hold editable name and email
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // Fetch user's blogs from backend when component mounts or user changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`https://blog-hqx2.onrender.com/blog/${user._id}`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs", err);
        setBlogs([]);
      }
    };
    if (user?._id) fetchBlogs();
  }, [user]);

  // Save updated profile information to backend
  const handleSave = async () => {
    try {
      const res = await axios.put(`https://blog-hqx2.onrender.com/user/${user._id}`, {
        name,
        email,
      });
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 mb-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        User Profile
      </h2>

      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">

        {/* Avatar block with optional uploaded image and initials fallback */}
        <div className="relative w-36 h-24 sm:w-36 sm:h-28 rounded-full overflow-hidden shadow-md group">
          {user?.avatarUrl ? (
            // If user has uploaded an avatar, show it
            <img
              src={user.avatarUrl}
              alt={user.name || "User Avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            // Otherwise, generate initials
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-4xl font-bold">
              {user?.name
                ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                : "U"}
            </div>
          )}

          {/* Hover overlay for upload (optional future feature) */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm text-white font-medium transition-opacity duration-300 cursor-pointer">
            Change Avatar
          </div>
        </div>


        {/* Editable user information */}
        <div className="text-center md:text-left flex flex-col gap-2 w-full">
          {editing ? (
            <>
              {/* Editable input fields */}
              <input
                type="text"
                className="border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Save and Cancel buttons */}
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);       // Cancel editing
                    setName(user.name);      // Reset to original data
                    setEmail(user.email);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Display profile info when not editing */}
              <div className="text-2xl font-semibold text-gray-800">{name}</div>
              <div className="text-gray-600">{email}</div>
              <div className="text-sm text-gray-500 italic">
                Member since:{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })
                  : "N/A"}
              </div>

              {/* Edit button */}
              <button
                onClick={() => setEditing(true)}
                className="mt-3 w-fit px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Horizontal divider */}
      <hr className="my-8 border-gray-300" />

      {/* Blog Stats + Blog List */}
      <div className="flex flex-col gap-6 items-stretch">

        {/* Total number of blogs */}
        <div className="bg-gray-100 rounded-lg p-6 w-64 flex flex-col items-center shadow">
          <div className="text-gray-700 font-medium mb-2">
            Total Blogs Uploaded
          </div>
          <div className="text-3xl text-teal-600 font-bold">{blogs.length}</div>
        </div>

        {/* User's blog titles */}
        <div className="w-full">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">
            Your Blogs
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {blogs.length === 0 ? (
              <li className="text-gray-500">No blogs yet.</li>
            ) : (
              blogs.map((blog) => (
                <li key={blog._id}>
                  <Link
                    to={`/singleblog/${blog._id}`}
                    className="text-teal-700 hover:underline transition-colors duration-200"
                  >
                    {blog.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
