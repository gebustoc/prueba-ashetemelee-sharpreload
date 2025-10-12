import {Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ItemController from "../ShittyRemoteStuff/ItemController";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import UserController from "../ShittyRemoteStuff/UserController";
import { useState } from "react";

function ProductInfo() {
    const { id } = useParams();
    const product = new ItemController().getItem(parseInt(id));
    if (!product){
        return (
            <Container className="wrapper">
                <h1>no se pudo encontrar el producto lol</h1>
            </Container>
        );
    }
    const hasUser = new UserController().userExists(localStorage.getItem("cur_user"));
    const [cartCount, setCartCount] = useState(
        hasUser ? new UserController().getUser(localStorage.getItem("cur_user")).getCarrito().filter((value)=>{product.getId() == value}).length : -1 
    );

    

    const navigate = useNavigate();

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
                    <Text variant="h2" className="py-4" children={"$"+new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(product.getPrice())}/>
                    
                    <Col style={{display:"flex",gap:".5rem"}}>
                        <Button className="btn btn-primary" id="boton-compra" children={`Comprar (${product.getStock()} restantes)`} disabled={!(hasUser && product.getStock() > 0)} onClick={()=>navigate(`/buy/${product.getId()}`)}/>
                        <Button className="btn btn-primary" id="boton-carrito" children={
                            "🛒 Añadir al carrito "+ (cartCount > 0 ? `(${cartCount} en el carrito)`: "" )} 
                            disabled={!(hasUser) } 
                            onClick={()=>{
                                const userData = new UserController().getUser(localStorage.getItem("cur_user"));
                                userData.setCarrito(userData.getCarrito().push(product.getId()));
                                new UserController().updateUser(userData);
                                setCartCount(cartCount+1);
                        }}/>
                    </Col>
                    
                    <Text variant="h3" children={product.getDescription()}/>

                </Col>

            </Row>


        </Container>

    );

}
/*
(()=>{
                                if (hasUser){
                                    const cartCount = new UserController().getUser(localStorage.getItem("cur_user")).getCarrito().filter((value)=>{product.getId() == value}).length
                                    if (cartCount == 0) return ""
                                    return 
                                }
                                return ""
                            }).call()*/

export default ProductInfo;