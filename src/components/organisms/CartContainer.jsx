
import Text from "../atoms/Text";
import CartCard from "../molecules/CartCard";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductosService from "../../services/ProductosService";

function CartContainer({user}){
    const [cart, setCart] = useState(user.carrito.slice());
    const [productos, setProductos] = useState([]);

    useEffect(()=>{
        let newProductos = [];
        for (let i =0;i < cart.length; i++){
            // this is kinda bad
            ProductosService.getProductoById(cart[i]).then(producto=>{
                newProductos.push(<CartCard 
                    product={producto} 
                    key={i} 
                    eraseItem={()=>{
                        let carrito = user.carrito;
                        carrito.splice(i,1);
                        newProductos.splice(i,1)
                        let userClone = JSON.parse(JSON.stringify(user));
                        userClone.carrito = JSON.stringify(user.carrito)
                        localStorage.setItem("user",JSON.stringify(userClone))
                        setProductos(newProductos.slice())
                    }}
                    itemSlot={i}
                
                />)
                setProductos(newProductos.slice())

            }).catch((err) => console.error("Error:", err));
        }},[])

    if (cart.length == 0){
        return <Text className="font-weight-light no-cuenta" children="No tienes nada en el carrito.." variant="h2"/>;
    }
    
    return (
        <Container>
            {productos}
        </Container>
    );
}
export default CartContainer;