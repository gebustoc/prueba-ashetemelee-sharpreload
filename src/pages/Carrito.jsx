import { Col, Container, Row } from "react-bootstrap";
import UserController from "../ShittyRemoteStuff/UserController";
import Text from "../components/atoms/Text";
import CartContainer from "../components/organisms/CartContainer";
import Button from "../components/atoms/Button";
import ItemController from "../ShittyRemoteStuff/ItemController";


function Carrito() {
    if (localStorage.getItem("user") == null){
        return (
            <Container className="wrapper">
                <Text className="font-weight-light" children="Carrito" variant="h1"/>
                <Text className="font-weight-light no-cuenta" children="No Has iniciado sesion" variant="h2"/>
            </Container>
        );
    }  
    const userData = JSON.parse(localStorage.getItem("user"));
    userData.carrito = userData.carrito || "[]";
    userData.carrito = JSON.parse(userData.carrito); // turns ts into an actual list

    return (
        <Container className="wrapper">

            <Container className="d-flex" style={{gap:"1rem"}}>
                <Text className="font-weight-light" children="Carrito" variant="h1"/>  
            </Container>
            <CartContainer user={userData}/>
            

        </Container>

    ); 
//
    

}

export default Carrito;