import { Container } from "react-bootstrap";
import ProductContainer from "../components/organisms/ProductContainer";



function Products() {
  return (
   <Container className="wrapper">
     <h1>Productos</h1>
      <ProductContainer text="Lista de productos disponibles."/>
   </Container>
 );
}


export default Products;