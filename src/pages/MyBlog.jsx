import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from "react-router-dom";

const MyBlog = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch user's blogs
  const fetchBlogs = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(
        `https://blog-hqx2.onrender.com/blog/${user._id}?t=${Date.now()}`
      );
      setMyBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [user?._id]);

  // Delete blog with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const response = await axios.delete(
        `https://blog-hqx2.onrender.com/blog/${id}`
      );
      if (response.status === 200) {
        alert("Blog deleted successfully");
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog.");
    }
  };

  // Update blog
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://blog-hqx2.onrender.com/blog/${editingBlog._id}`,
        {
          title: editingBlog.title,
          content: editingBlog.content,
        }
      );

      if (response.status === 200) {
        alert("Blog updated successfully");
        const updatedBlog = response.data;

        setMyBlogs((prev) =>
          prev.map((blog) =>
            blog._id === updatedBlog._id ? updatedBlog : blog
          )
        );

        setEditingBlog(null);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Blogs</h1>

      {myBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myBlogs.map((blog) => (
            <Link
             to={`/singleblog/${blog._id}`}
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.content}
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    className="text-blue-600 flex items-center gap-1"
                    onClick={() =>
                      setEditingBlog({ ...blog, imageFile: null })
                    }
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    className="text-red-600 flex items-center gap-1"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <input
                type="text"
                className="p-2 border rounded"
                value={editingBlog.title}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, title: e.target.value })
                }
                required
              />
              <textarea
                className="p-2 border rounded"
                value={editingBlog.content}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, content: e.target.value })
                }
                required
              />
              <input
                type="file"
                onChange={(e) =>
                  setEditingBlog({
                    ...editingBlog,
                    imageFile: e.target.files[0],
                  })
                }
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlog;
