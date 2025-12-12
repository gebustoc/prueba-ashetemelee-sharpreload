import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import UserService from "../../services/UserService";

function LoginButtons() {
    const navigate = useNavigate();
    let loggedUser = localStorage.getItem("cur_user"); // oh god why

    if (loggedUser == null){
        return (
            <Container className="login_container">
                <Button children="Iniciar Sesion" onClick={()=>navigate("/login")} />
                <Button children="Registrar" onClick={()=>navigate("/register")} />
            </Container>
        );
    }   
    return (
        <Container className="login_container">
            <Button children="Cerrar Sesion" onClick={()=>{
                UserService.logout();   
                navigate("/login")
            }}/>
            <Button children="🛒 Carrito" onClick={()=>navigate("/cart")} />
        </Container>
    );
}

export default LoginButtons;