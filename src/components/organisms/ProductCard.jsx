import {Button,Card} from "react-bootstrap";

function ProductCard(element) {
    return (
        <div id="product_card">
            <Card>
                <Card.Body>    
                    <Card.Img variant="top" src={element.getImgSrc()} width="300" class="productImage"></Card.Img>
                    <h3 class="card-title">{element.getName()}</h3>
                    <h4>${element.getDescription()}</h4>
                    <p class="card-text"> ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(price)}</p>
                    <Button>Comprar {element.getStock()} en stock</Button>
                </Card.Body>
            </Card>
        </div>

    );
}


export default NavBar;