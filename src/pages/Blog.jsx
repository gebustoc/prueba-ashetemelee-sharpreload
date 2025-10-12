import { Container } from "react-bootstrap";
import Text from "../components/atoms/Text";
import BlogCard from "../components/organisms/BlogCard";

function Blog() {
  return (
    <Container className="wrapper text-center my-5">
      <Text variant="h1" className="mb-4">Blog</Text>
      <BlogCard 
      link={"/news"} 
      title={"Noticia 1"} 
      description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt autem minus ullam voluptas qui perspiciatis ratione magnam repellendus perferendis doloremque, nihil, dolorem impedit recusandae in nemo amet ea quas! Placeat?"}
      image={"/img/18674633-digital-news-laptop-mobile-phone-and-digital-tablet-pc-3d.webp"}>
      </BlogCard>
      <BlogCard 
      link={"/news2"} 
      title={"Noticia 2"} 
      description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt autem minus ullam voluptas qui perspiciatis ratione magnam repellendus perferendis doloremque, nihil, dolorem impedit recusandae in nemo amet ea quas! Placeat?"}
      image={"/img/hombre-negocios-que-presenta-noticias-computadora-portatil_53876-14044.webp"}>
      </BlogCard>
    </Container>
  );
}

export default Blog;
