import {Button,Card} from "react-bootstrap";

function ProductCard({product}) {

    return (
        <div id="product_card" style={{width:"18rem"}}>
            <Card>
                <Card.Img src={product.getImgSrc()} width="300" height="300"></Card.Img>
                <Card.Body>    
                    <h3 className="card-title">{product.getName()}</h3>
                    <h4>{product.getDescription()}</h4>
                    <Card.Text> ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(product.getPrice())}</Card.Text>
                    <Button>Comprar {product.getStock()} en stock</Button>
                </Card.Body>
            </Card>
        </div>
    );
}


export default ProductCard;