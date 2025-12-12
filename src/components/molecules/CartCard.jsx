import React from "react";
import { Card, Col, FormCheck, Row } from "react-bootstrap";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CartCard({product,eraseItem,itemSlot}){
    const navigate = useNavigate()
    const [stock, setStock] = useState(product.stock)
    return (
        <Card>
            <Row className>
                <Card.Img src={product.bbID} style={{width: "15rem"}}/>
                <Col>
                    <Text variant="h3" children={product.nombre}/>
                    <Text variant="h5" children={new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(product.precio)}/>
                    <div style={{display:"flex",gap:".5rem"}}>
                    <Button disabled={stock==0} children={`Comprar (stock ${stock})`} onClick={()=>{
                        navigate(`/checkout/${product.id}/${itemSlot}`)
                    }}/>
                    <Button children={<Image src={product.bbID} alt=""/> }  onClick={eraseItem} />
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default CartCard;