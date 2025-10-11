import { Container } from "react-bootstrap";
import Text from "../components/atoms/Text";
import Image from "../components/atoms/Image";
import BlogCard from "../components/organisms/BlogCard";

function Blog() {
  return (
    <Container className="wrapper text-center my-5">
      <Text variant="h1" className="mb-4">Blog</Text>
      <BlogCard 
      link={"#"} 
      title={"Noticia 1"} 
      description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt autem minus ullam voluptas qui perspiciatis ratione magnam repellendus perferendis doloremque, nihil, dolorem impedit recusandae in nemo amet ea quas! Placeat?"}
      image={"public/img/18674633-digital-news-laptop-mobile-phone-and-digital-tablet-pc-3d.webp"}>
      </BlogCard>
      <BlogCard 
      link={"#"} 
      title={"Noticia 2"} 
      description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt autem minus ullam voluptas qui perspiciatis ratione magnam repellendus perferendis doloremque, nihil, dolorem impedit recusandae in nemo amet ea quas! Placeat?"}
      image={"public/img/hombre-negocios-que-presenta-noticias-computadora-portatil_53876-14044.webp"}>
      </BlogCard>
    </Container>
  );
}

export default Blog;
