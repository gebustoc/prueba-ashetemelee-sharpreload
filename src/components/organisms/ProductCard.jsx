import {Button,Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../../styles/product-card.css';


function ProductCard({product}) {
    
  const navigate = useNavigate();

  const imageUrl = `https://ibb.co/${product.bbID}`
  //product.imagen || "https://m.media-amazon.com/images/I/51N7-BydsDL.jpg";

  return (
    <div id="product_card" style={{ width: "18rem" }}>
      <Card>
        <Card.Img 
        className="product-image"
          src={imageUrl}
          width="300"
          height="300"
          alt={product.nombre}
          onClick={() => navigate(`/product/${product.id}`)}
        />

        <Card.Body>    
          <Card.Title>{product.nombre}</Card.Title>

          <Card.Text>{product.descripcion}</Card.Text>

          <Card.Text>
            {new Intl.NumberFormat("es-CL", { 
              style: "currency", 
              currency: "CLP" 
            }).format(product.precio)}
          </Card.Text>

          <Button onClick={() => navigate(`/product/${product.id}`)}>
            Comprar — {product.stock} en stock
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}


export default ProductCard;