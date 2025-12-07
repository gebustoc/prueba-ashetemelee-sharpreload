import { Container } from "react-bootstrap";
import Text from "../components/atoms/Text";
import CartContainer from "../components/organisms/CartContainer";

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
    userData.carrito = JSON.parse(userData.carrito); 

    return (
        <Container className="wrapper">

            <Container className="d-flex" style={{gap:"1rem"}}>
                <Text className="font-weight-light" children="Carrito" variant="h1"/>  
            </Container>
            <CartContainer user={userData}/>
            

        </Container>
    ); 
}

export default Carrito;