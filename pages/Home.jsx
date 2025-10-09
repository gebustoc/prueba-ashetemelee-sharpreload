import { Container, Row } from "react-bootstrap";
import Wrapper from "../src/components/organisms/atoms/Wrapper";
import ItemController from "../src/ShittyRemoteStuff/ItemController";
import ProductCard from "../src/components/organisms/ProductCard";


function Home() {
  let cards = []

  for (const product of new ItemController().getItems()) {
    cards.push(<ProductCard product={product}/>)
  }


 return (
   <Container className="my-5 wrapper">
     <h1>Página de Inicio</h1>
     <p>Bienvenidos a nuestro sitio web.</p>
      <Row>{cards}</Row>

   </Container> 
 );
}


export default Home;