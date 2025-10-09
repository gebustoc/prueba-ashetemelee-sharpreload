import { Container, Row } from "react-bootstrap";
import ItemController from "../src/ShittyRemoteStuff/ItemController";
import ProductCard from "../src/components/organisms/ProductCard";
import ProductContainer from "../src/components/organisms/ProductContainer";


function Home() {

 return (

   <Container className="wrapper">
     <h1>Página de Inicio</h1>

     <p>Bienvenidos a nuestro sitio web.</p>
     <ProductContainer text="Mas Vendidos" limit={6}></ProductContainer>


   </Container> 
 );
}


export default Home;