import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ItemController from "../ShittyRemoteStuff/ItemController";
import Text from "../components/atoms/Text";

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
                        src={"/"+product.getImgSrc()}
                        alt="" id="imagen-producto" style={{width:"32rem"}}>
                    </img>
                </Col>
                <Col>
                    <Text variant="h1" className="py-4" children={product.getName()}/>
                    <Text variant="h2" className="py-4" children={product.getName()}/>
                    
                    <Button className="btn btn-primary" id="boton-compra">🛒 Añadir al carrito</Button>
                    <Text variant="h3" children={product.getDescription()}/>

                </Col>

            </Row>


        </Container>

    );

}

export default ProductInfo;