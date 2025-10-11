import BlogCardContent from "../molecules/BlogCardContent";
import Link from "../atoms/Link";

function BlogCard({link, title, description, image}){
    return (
        <Link href={link} className="text-decoration-none text-current">
            <BlogCardContent title={title} description={description} image={image}/>
        </Link>
    )
}

export default BlogCard;