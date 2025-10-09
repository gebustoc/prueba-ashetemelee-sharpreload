import { Container } from "react-bootstrap";
import ItemController from "../ShittyRemoteStuff/ItemController";
import ProductCard from "../components/organisms/ProductCard";


function Products() {
  let cards = []

  for (const product of new ItemController().getItems())cards.push(<ProductCard product={product}/>)
  
  return (
   <Container className="my-5 wrapper">
     <h1>Productos</h1>
      <Container className="py-2">
        <h2 className="font-weight-light">Lista de productos disponibles.</h2>
        <div className="d-flex flex-wrap justify-content-center" id="product-container">      
          {cards}
        </div>
      </Container>
   </Container>
 );
}


export default Products;