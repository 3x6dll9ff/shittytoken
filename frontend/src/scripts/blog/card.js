import React from "react";
import "../../css/blog/card.css";

const BlogCard = () => {
  return (
    <div className="blog-card-container">
      <div className="blog-line"></div>
      <div className="blog-card-description">
        Hi, I’m Nightshade. Your system has been hacked. I don’t harm ordinary
        people, but you have serious vulnerabilities. This is a warning: fix
        them before someone else exploits them for something truly dangerous.
      </div>
      <div className="blog-read-more">Read more</div>
      <div className="blog-date">17</div>
      <div className="blog-date-month">Aug</div>
      <div className="blog-label-text">Sex Drugs Friends</div>
    </div>
  );
};

export default BlogCard;
