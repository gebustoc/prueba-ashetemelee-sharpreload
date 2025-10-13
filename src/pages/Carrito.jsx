import { Col, Container, Row } from "react-bootstrap";
import UserController from "../ShittyRemoteStuff/UserController";
import Text from "../components/atoms/Text";
import CartContainer from "../components/organisms/CartContainer";
import Button from "../components/atoms/Button";
import ItemController from "../ShittyRemoteStuff/ItemController";


function Carrito() {
    if (!new UserController().userExists(localStorage.getItem("cur_user"))){
        return (
            <Container className="wrapper">
                <Text class="font-weight-light" children="Carrito" variant="h1"/>
                <Text class="font-weight-light no-cuenta" children="No Has iniciado sesion" variant="h2"/>
            </Container>
        );
    }  

    const userData = new UserController().getUser(localStorage.getItem("cur_user"));
    let PrecioTotal = 0;
    userData.getCarrito().forEach(element => {PrecioTotal += new ItemController().getItem(element).getPrice();});

    return (
        <Container className="wrapper">

            <Container className="d-flex" style={{gap:"1rem"}}>
                <Text class="font-weight-light" children="Carrito" variant="h1"/>  
            </Container>

            <CartContainer user={userData}/>
        </Container>
        /*
        scrapped for reasons
                <Container className="d-flex flex-row-reverse">
                    <div style={{alignContent:"center"}}>
                        <Button children={`Comprar todo (${new Intl.NumberFormat("de-DE", { style: "currency", currency: "CLP" }).format(PrecioTotal)})`} onClick={()=>{
                            

                        }}/>
                    </div>
                </Container>*/
    );   
    

}

export default Carrito;