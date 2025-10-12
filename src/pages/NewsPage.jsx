import  HeroSection  from "../components/organisms/HeroSection";
import  ArticleContent from "../components/organisms/ArticleContent";
import { Container } from "react-bootstrap";

function NewsPage() {
    return (
        <Container fluid className="p-0">
            <HeroSection
                title="Título de la Noticia"
                description="Esta es una descripción breve de la noticia."
                backgroundImage={"/img/18674633-digital-news-laptop-mobile-phone-and-digital-tablet-pc-3d.webp"}
            />
            <ArticleContent
                author="Juan Pérez"
                date="20 de Octubre de 2023"
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

export default NewsPage;