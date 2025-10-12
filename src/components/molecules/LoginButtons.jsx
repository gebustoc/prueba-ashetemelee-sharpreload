import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { useState } from "react";

function LoginButtons() {
    const navigate = useNavigate();
    let loggedUser = localStorage.getItem("cur_user"); // oh god why
    


    if (loggedUser == null){
        return (
            <Container className="login_container">
                <Button children="Iniciar Sesion" onClick={()=>navigate("login")} />
                <Button children="Registrar" onClick={()=>navigate("register")} />
            </Container>
        );
    }
    return (
        <Container className="login_container">
            <Button children="Cerrar Sesion" onClick={()=>{
                window.location.href = "/"
                localStorage.removeItem("cur_user")
            }}/>


        </Container>
    );
}

export default LoginButtons;