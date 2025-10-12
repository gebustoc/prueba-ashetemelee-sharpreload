import  HeroSection  from "../components/organisms/HeroSection";
import  ArticleContent from "../components/organisms/ArticleContent";
import { Container } from "react-bootstrap";

function NewsPage2() {
    return (
        <Container fluid className="p-0">
            <HeroSection
                title="Título de la Noticia 2"
                description="Esta es una descripción breve de la noticia 2."
                backgroundImage={"/img/hombre-negocios-que-presenta-noticias-computadora-portatil_53876-14044.webp"}
            />
            <ArticleContent
                author="John Doe"
                date="22 de Octubre de 2024"
                paragraphs={[
                    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    "excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                ]}
            />
        </Container>    
    )
}

export default NewsPage2;