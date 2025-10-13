import { Container, Row } from "react-bootstrap";
import ProductContainer from "../components/organisms/ProductContainer";
import { Carousel } from "react-bootstrap";


function Home() {

 return (

   <Container className="wrapper">
    <h1>Página de Inicio</h1>
    <p>Bienvenidos a nuestro sitio web.</p>
    <Carousel>
      <Carousel.Item>
          <img src="./img/Banner-PPAL.webp" class="d-block w-100 carousel-img" alt="nocargojeje"></img>
      </Carousel.Item>
      <Carousel.Item>
          <img src="./img/Modyo-WEB-Banner-Pricipal-1792X4.webp" class="d-block w-100 carousel-img" alt="nocargojeje"></img>
      </Carousel.Item>
      <Carousel.Item>
          <img src="./img/WEB-Banner-Header-1920x300-.webp" class="d-block w-100 carousel-img" alt="nocargojeje"></img>
      </Carousel.Item>


    </Carousel>

    <ProductContainer text="Mas Vendidos" limit={6}></ProductContainer>


   </Container> 
 );
}


export default Home;