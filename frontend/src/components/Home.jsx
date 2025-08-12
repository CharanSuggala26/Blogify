import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/blogs");
      setBlogs(res.data.data); // data is the array returned from backend
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleAdd = async () => {
    if (!title || !content || !author) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:4000/blogs/add", {
        title,
        content,
        author,
      });
      setTitle("");
      setContent("");
      setAuthor("");
      fetchBlogs(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="bg-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-4">Blog App</h1>

      {/* Blog form */}
      <div className="bg-gray-500 p-4 w-1/2 mb-6">
        <input
          className="bg-white p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="bg-white p-2 w-full mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="bg-white p-2 w-full mb-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

       <div className="row row-cols-1 row-cols-md-3 g-4">
  {blogs.length > 0 ? (
    blogs.map((blog, index) => (
      <div className="col" key={index}>
        <div className="card h-100 shadow-sm">
          {blog.image && (
            <img
              src={blog.image}
              className="card-img-top"
              alt={blog.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
          )}
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text flex-grow-1">{blog.content}</p>
          </div>
          <div className="card-footer text-muted">
            By {blog.author} {blog.date && `• ${blog.date}`}
          </div>
        </div>
      </div>
    ))
    ) : (
     <p className="text-center">No blogs found.</p>
    )}
    </div>



      </div>
  );
};

export default Home;
