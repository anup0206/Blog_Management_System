import axios from "axios";

/**
 * Update a blog post by ID
 * @param {string} id - Blog ID to update
 * @param {Object} updatedData - The updated blog fields
 * @param {string} updatedData.title - Blog title
 * @param {string} updatedData.content - Blog content
 * @param {File} [updatedData.image] - Optional new image file
 * @returns {Promise<void>}
 */
export const updateBlog = async (id, updatedData) => {
    if (!id || !updatedData.title || !updatedData.content) {
        alert("Missing required fields.");
        return;
    }

    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("content", updatedData.content);
    if (updatedData.image) {
        formData.append("image", updatedData.image);
    }

    try {
        const response = await axios.put(
            `https://blog-hqx2.onrender.com/blog/${id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
            alert("Blog updated successfully.");
        } else {
            alert("Update failed. Please try again.");
        }
    } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update the blog.");
    }
};
