import { Card, Col, Row } from "react-bootstrap";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import { useNavigate } from "react-router-dom";
import ItemController from "../../ShittyRemoteStuff/ItemController";
import { useState } from "react";


function CartCard({product,eraseItem}){
    const navigate = useNavigate()
    const [stock, setStock] = useState(product.getStock())
    return (
        <Card>
            <Row className>
                <Card.Img src={product.getImgSrc()} style={{width: "15rem"}}/>
                <Col>
                    <Text variant="h3" children={product.getName()}/>
                    <Text variant="h5" children={new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(product.getPrice())}/>
                    <div style={{display:"flex",gap:".5rem"}}>
                    <Button disabled={stock==0} children={`Comprar (stock ${stock})`} onClick={()=>{
                        product.setStock(stock-1);
                        new ItemController().updateItem(product);
                        setStock(stock-1);
                        eraseItem()
                    }}/>
                    <Button children={<Image src="./img/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt=""/> }  onClick={eraseItem} />
                    </div>
                </Col>
            </Row>
        </Card>


    );
}
export default CartCard;