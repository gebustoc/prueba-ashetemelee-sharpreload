import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/atoms/Button";
import Text from "../components/atoms/Text";
import Form from "../components/molecules/Form";
import UserService from "../services/UserService"; 
import '../styles/login.css';

function Login() {
    if (UserService.isAuthenticated()) {
        window.location.href = "/"
        return;
    }

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(''); 
    
    const initialFormData = {
        email: '',
        contrasena: '', 
        errorEmail: 'el correo no puede estar vacio',
        errorContrasena: 'la contraseña no puede estar vacia'
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleLogin = async () => {
        setErrorMessage(''); 
        try {
            await UserService.login(formData.email, formData.contrasena);
            
            navigate("/");
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.";
            setErrorMessage(errorMsg);
            console.error("Login failed:", error);
        }
    };
    
    const formInputs = [
        {
            id: 'email',
            type: 'text',
            label: 'Correo',
            placeholder: 'Ingresa tu correo',
            value: formData.email,
            error: formData.errorEmail,
            onChange: (e) => {
                let error = "";
                let correovali = e.target.value.split("@").pop();
                if (correovali !== "duocuc.cl") error = "el correo no es un correo duoc valido";
                if (e.target.value.length === 0) error = "el correo no puede estar vacio";
                setFormData({ ...formData, email: e.target.value, errorEmail: error });
            }

        },
        {
            id: 'contrasena',
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Ingresa una contraseña',
            value: formData.contrasena,
            error: formData.errorContrasena,
            onChange: (e) => setFormData({ 
                ...formData, 
                contrasena: e.target.value, 
                errorContrasena: e.target.value.length ? "" : "la contraseña no puede estar vacia"
            })
        }

    ];

    const isFormValid = formData.errorEmail === "" && formData.errorContrasena === "";
    
    return (
        <Container className="wrapper">
            <Text children="Bienvenido" variant="h1" className="text-center"></Text>
            <Row className="justify-content-center">
                <Col className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Form inputs={formInputs} />

                            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                            
                            <div style={{paddingTop: "1rem"}}>
                                <Button 
                                    id="boton-inicio" 
                                    type="submit" 
                                    children="Iniciar Sesion" 
                                    onClick={handleLogin} 
                                    disabled={!isFormValid}
                                />
                                <div><a href="register">Crear cuenta?</a></div>
                            </div>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    )
}

export default Login;