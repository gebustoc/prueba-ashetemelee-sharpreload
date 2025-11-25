import { Card, Col, FormCheck, Row } from "react-bootstrap";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import { useNavigate } from "react-router-dom";
import ItemController from "../../ShittyRemoteStuff/ItemController";
import { useState } from "react";
import ProductosService from "../../services/ProductosService";


function CartCard({product,eraseItem}){
    const navigate = useNavigate()
    const [stock, setStock] = useState(product.stock)
    return (
        <Card>
            <Row className>
                <Card.Img src="https://m.media-amazon.com/images/I/51N7-BydsDL.jpg" style={{width: "15rem"}}/>
                <Col>
                    <Text variant="h3" children={product.nombre}/>
                    <Text variant="h5" children={new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(product.precio)}/>
                    <div style={{display:"flex",gap:".5rem"}}>
                    <Button disabled={stock==0} children={`Comprar (stock ${stock})`} onClick={()=>{
                        navigate(`/checkout/${product.id}`)
                        /*product.stock = stock-1;
                        ProductosService.updateProducto(product.id,product)
                        setStock(stock-1); // huh¡
                        eraseItem()*/
                    }}/>
                    <Button children={<Image src="./img/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt=""/> }  onClick={eraseItem} />
                    </div>
                </Col>
            </Row>
        </Card>


    );
}
export default CartCard;