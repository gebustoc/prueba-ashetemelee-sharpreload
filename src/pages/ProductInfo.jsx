import { useParams } from "react-router-dom";
import ItemController from "../src/ShittyRemoteStuff/ItemController";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../src/components/organisms/ProductCard";

function ProductInfo() {
    const { id } = useParams();
    const product = new ItemController().getItem(parseInt(id))
    if (!product){
        return (
            <Container className="wrapper">
                <h1>no se pudo encontrar el producto lol</h1>
            </Container>
        );
    }


    return (
        <Container className="wrapper">
            <Row className="align-items center mb-5 p3">
                <Col>
                    <img className="img-fluid border"
                        src={"."+product.getImgSrc()}
                        alt="" id="imagen-producto" style={{width:"32rem"}}>
                    </img>
                </Col>
                <Col>
                    <h1 className="py-4" id="nombre-producto">{product.getName()}</h1>
                    <h2 className="py-4" id="precio-producto">${product.getPrice()}</h2>
                    <Button className="btn btn-primary" id="boton-compra">🛒 Añadir al carrito</Button>
                    <h3 id="desc-producto">{product.getDescription()}</h3>

                </Col>

            </Row>


        </Container>

    );

}

export default ProductInfo;