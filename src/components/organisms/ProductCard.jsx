import {Button,Card} from "react-bootstrap";

function ProductCard({product}) {
    console.log(product)

    return (
        <div id="product_card">
            <Card>
                <Card.Body>    
                    <Card.Img variant="top" src={product.getImgSrc()} width="300" class="productImage"></Card.Img>
                    <h3 class="card-title">{product.getName()}</h3>
                    <h4>{product.getDescription()}</h4>
                    <p class="card-text"> ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(product.getPrice())}</p>
                    <Button>Comprar {product.getStock()} en stock</Button>
                </Card.Body>
            </Card>
        </div>
    );
}


export default ProductCard;