import { Container, Row } from "react-bootstrap";
import ItemController from "../src/ShittyRemoteStuff/ItemController";
import ProductCard from "../src/components/organisms/ProductCard";


function Home() {
  let cards = []

  for (const product of new ItemController().getItems(6))cards.push(<ProductCard product={product}/>)
  


 return (

   <Container className="wrapper">
     <h1>Página de Inicio</h1>
     <p>Bienvenidos a nuestro sitio web.</p>
      <Container className="py-2">
        <h2 className="font-weight-light">Mas Vendidos</h2>
        <div className="d-flex flex-wrap justify-content-center" id="product-container">      
          {cards}
        </div>
      </Container>
  


   </Container> 
 );
}


export default Home;