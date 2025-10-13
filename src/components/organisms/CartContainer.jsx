
import Text from "../atoms/Text";
import ItemController from "../../ShittyRemoteStuff/ItemController";
import CartCard from "../molecules/CartCard";
import { Container } from "react-bootstrap";
import UserController from "../../ShittyRemoteStuff/UserController";
import { useState } from "react";


function CartContainer({user}){
    const [cart, setCart] = useState(user.getCarrito());

    if (cart.length == 0){
        return <Text className="font-weight-light no-cuenta" children="No tienes nada en el carrito.." variant="h2"/>;
    }
    let productos = [];
    cart.map((item,i)=>{
        productos.push(<CartCard product={new ItemController().getItem(item)} key={i} eraseItem={()=>{
            user.getCarrito().splice(i,1);
            new UserController().updateUser(user);
            setCart(Array.from(user.getCarrito()));
            console.log("???")
        }}/>)}
    );

    return (
        <Container>
            
            {productos}
        </Container>
    );
}
export default CartContainer;