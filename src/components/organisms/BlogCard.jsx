import React from "react";
import BlogCardContent from "../molecules/BlogCardContent";
import { Link } from "react-router-dom";

function BlogCard({link, title, description, image}){
    return (
        <Link to={link} className="blog-card text-decoration-none text-current">
            <BlogCardContent title={title} description={description} image={image}/>
        </Link>
    )
}

export default BlogCard;