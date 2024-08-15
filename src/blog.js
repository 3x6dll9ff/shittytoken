import React from "react";
import "./css/blog/blog.css";
import BlogCard from "./scripts/blog/card";

class Blog extends React.Component {
  render() {
    const blogCards = Array.from({ length: 5 }, (_, index) => index);

    return (
      <div className="blog-container">
        {blogCards.map((index) => (
          <BlogCard key={index} />
        ))}
      </div>
    );
  }
}

export default Blog;
