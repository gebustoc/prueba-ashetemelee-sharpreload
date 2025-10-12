import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import Text from "../components/atoms/Text";
import Form from "../components/molecules/Form";

import UserController from "../ShittyRemoteStuff/UserController";
import User from "../ShittyRemoteStuff/User";


function Register() {
    if (localStorage.getItem("cur_user") !== null){
        window.location.href = "/"
        return;
    }

    const navigate = useNavigate();
    const initialFormData = {
        email: '',
        password: '',
        errorEmail:'el correo no puede estar vacio',
        errorPassword:'la contraseña no puede estar vacia'
        
    };
    const [formData, setFormData] = useState(initialFormData);
    
    const formInputs = [
        {
            id: 'email',
            type: 'text',
            label: 'Correo',
            placeholder: 'Ingresa tu nombre',
            value: formData.email,
            error: formData.errorEmail,
            onChange: (e) => {
                let error = "";
                let correovali = e.target.value.split("@").pop();
                if (correovali === undefined || correovali !== "duocuc.cl") error = "el correo no es un correo duoc valido";
                if (e.target.value.length == 0) error = "el correo no puede estar vacio";
                setFormData({ ...formData, email: e.target.value, errorEmail:error });
            }

        },
        {
            id: 'password',
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Ingresa una contraseña',
            value: formData.password,
            error: formData.errorPassword,
            onChange: (e) => setFormData({ ...formData, password: e.target.value, errorPassword: e.target.value.length ? "" : "la contraseña no puede estar vacia"})
        }

    ];


    const shittyMockValidateAcc = ()=>{
        const dummyUser = new User(formData.email,formData.password);
        if (!new UserController().userExists(formData.email)){
            new UserController().saveUser(dummyUser);
            localStorage.setItem("cur_user",formData.email);
            navigate("/");
            return;
        }
        alert("el usuario ya existe.");

    }
    



    return (
        <Container className="wrapper">
            <Text children="Bienvenido" variant="h1" className="text-center"></Text>
            <Row className="justify-content-center">
            <Col className="col-md-6">
                <Card>
                    <Card.Body>
                        <Form inputs={formInputs} />
                        <div style={{paddingTop: "1rem"}}>
                            <Button id="boton-inicio" type="submit" children="Crear Cuenta" onClick={shittyMockValidateAcc} disabled={formData.errorEmail+formData.errorPassword != ""}/>
                        </div>
                    </Card.Body>
                </Card>

            </Col>


            </Row>
        </Container>
    )


}

export default Register;