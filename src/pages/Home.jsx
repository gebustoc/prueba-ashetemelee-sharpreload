import { Container, Row } from "react-bootstrap";
import ProductContainer from "../components/organisms/ProductContainer";


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