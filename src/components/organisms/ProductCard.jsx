import {Button,Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/Text";

function ProductCard({product}) {
    const navigate = useNavigate();

    return (
        <div id="product_card" style={{width:"18rem"}}>
            <Card>
                <Card.Img src={product.getImgSrc()} width="300" height="300"></Card.Img>
                <Card.Body>    
                    <Text className="card-title" variant="h3" children={product.getName()}/>
                    <Text variant="h4" children={product.getDescription()}/>
                    <Card.Text> ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(product.getPrice())}</Card.Text>
                    <Button onClick={()=>{
                        navigate(`/product/${product.getId()}`)
                    }}>Comprar {product.getStock()} en stock</Button>
                </Card.Body>
            </Card>
        </div>

    );
}


export default ProductCard;