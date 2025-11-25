import { useEffect, useState } from "react";
import ProductosService from "../services/ProductosService";
import ProductCard from "../components/organisms/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import CartCard from "../components/molecules/CartCard";
import { Card, Col, Row } from "react-bootstrap";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import TipoPagoService from "../services/TipoPagoService";
import UserService from "../services/UserService";
import PedidoService from "../services/PedidoService";

function Checkout(){
    const { id,cartSlot } = useParams();
    const nav = useNavigate()

    const intID = parseInt(id)
    const [pagoType, setPagoType] = useState(1)
    const [layout, setLayout] = useState(
        <div className="wrapper">
        </div>
    );
    if (!UserService.isAuthenticated()) return (
        <div className="wrapper">
            <Text variant="h2" children={"debes iniciar sesion para poder comprar."}/>
        </div>

    );

    // load product data lol
    useEffect(()=>{    
        if (!UserService.isAuthenticated()) return;
        ProductosService.getProductoById(intID).then(
            data=>{
                TipoPagoService.getAllTipoPago().then(
                    (tiposPago)=>{
                        let options = []

                        for (const tipoPago of tiposPago) {
                            options.push(<option value={tipoPago.id}>{tipoPago.nombreMetodoPago}</option>)
                        }

                        setLayout(
                            <div className="wrapper">
                                <Card>
                                    <Row className>
                                        <Card.Img src="https://m.media-amazon.com/images/I/51N7-BydsDL.jpg" style={{width: "15rem"}}/>
                                        <Col>
                                            <Text variant="h3" children={data.nombre}/>
                                            <div style={{display:"flex",gap:".5rem"}}>
                                                <Text variant="h5" children={new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(data.precio)}/>
                                                <Button disabled={data.stock==0} children={`Finalizar Compra? (stock:${data.stock})`} onClick={()=>{
                                                    setLayout(
                                                        <div className="wrapper">
                                                            <Text variant="h2" children={"Cargando Compra.."}/>
                                                        </div>
                                                    )
                                                    
                                                    data.stock -= 1
                                                    ProductosService.updateProducto(data.id,data).then(
                                                        ()=>{
                                                            const user = JSON.parse(localStorage.getItem("user"))
                                                            PedidoService.createPedido(
                                                                {
                                                                    
                                                                    "fechaPedido": "2025-11-25T19:33:46.678Z",
                                                                    totalPedido:1,
                                                                    cliente:user,
                                                                    metodoEnvio: {id: 2},
                                                                    metodoPago: {id: pagoType},
                                                                    estadoPedido: {id: 2,}
                                                                    
                                                                }

                                                            ).then(
                                                                ()=>{
                                                                    if (cartSlot == undefined){
                                                                        nav("/")
                                                                        return;
                                                                    }
                                                                    const carritoSlotID = parseInt(cartSlot)
                                                                    if (isNaN(carritoSlotID)) return;
                                                                    user.carrito = JSON.parse(user.carrito)
                                                                    let carrito = user.carrito;
                                                                    carrito.splice(carritoSlotID,1);
                                                                    user.carrito = JSON.stringify(carrito);
                                                                    localStorage.setItem("user",JSON.stringify(user))
                                                                    nav("/cart")
                                                            }
                                                            )

                                                        }
                                                    )


                                                }}/>

                                                <label htmlFor="checkout" style={{alignSelf:"center"}}>Tipo Checkout:</label>
                                                <select name="Tipo Pago" id="checkout" defaultValue={pagoType} onChange={ev=>{setPagoType(parseInt(ev.target.value))}}>
                                                    {options}

                                                </select>

                                            </div>
                                        
                                        </Col>
                                    </Row>
                                </Card>


                            </div>
                        );

                    }

                ).catch((err) => console.error("Error:", err));


            }

        ).catch((err) => console.error("Error:", err));

    },[]);
    return layout;

}

export default Checkout;