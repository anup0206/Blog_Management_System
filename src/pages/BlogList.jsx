import React from "react";

const BlogList = ({ blogs }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs && blogs.length > 0 ? (
                blogs.map((val, i) => (
                    <div key={i} className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-semibold">{val.title}</h2>
                        <p className="text-gray-600">{val.content}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center col-span-3">No blogs available.</p>
            )}
        </div>
    );
};

export default BlogList;