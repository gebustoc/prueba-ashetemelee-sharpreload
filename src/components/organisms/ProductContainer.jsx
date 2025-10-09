import { Container } from "react-bootstrap";
import ItemController from "../../ShittyRemoteStuff/ItemController";
import ProductCard from "./ProductCard";

function ProductContainer({text, limit=Infinity}){
    let cards = []
    let i = 0;
    
    for (const product of new ItemController().getItems(limit)){
        cards.push(<ProductCard product={product} key={i++}/>)
    }

    return (
      <Container className="py-2">
        <h2 className="font-weight-light">{text}</h2>
        <div className="d-flex flex-wrap justify-content-center" id="product-container"  style={{gap:"1rem"}}>      
          {cards}
        </div>
      </Container>
    ); 

}

export default ProductContainer;