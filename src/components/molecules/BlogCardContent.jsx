import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";

function BlogCardContent({title, description, image}){
    return (
        <div className="row align-items-center mb-5 p-3 bg-secondary bg-opacity-10 rounded shadow-sm">
            <div className="col-md-6">
                <Text variant="h3">{title}</Text>
                <Text variant="p">{description}</Text>
            </div>
            <div className="col-md-6">
                <Image src={image} alt={title} className="img-fluid"></Image>
            </div>
        </div>
    )
}

export default BlogCardContent;