import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import Text from "../components/atoms/Text";
import Form from "../components/molecules/Form";
import UserService from "../services/UserService"; 
import RegionService from "../services/RegionService";
import ComunaService from "../services/ComunaService";

function Register() {
    if (UserService.isAuthenticated()) {
        window.location.href = "/"
        return;
    }

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [listaRegiones, setListaRegiones] = useState([]);
    const [todasLasComunas, setTodasLasComunas] = useState([]); 
    const [comunasFiltradas, setComunasFiltradas] = useState([]); 

    const initialFormData = {
        nombre: '',
        email: '',
        contrasena: '',
        telefono: '',
        direccion: '',
        regionId: '', 
        comunaId: '',
        errorNombre: 'el nombre es requerido',
        errorEmail: 'el correo es requerido',
        errorContrasena: 'la contraseña es requerida',
        errorTelefono: 'el telefono es requerido',
        errorDireccion: 'la direccion es requerida',
        errorRegion: 'la region es requerida',
        errorComuna: 'la comuna es requerida'
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [regionesData, comunasData] = await Promise.all([
                    RegionService.getAllRegiones(),
                    ComunaService .getAllComunas()
                ]);
                
                setListaRegiones(regionesData);
                setTodasLasComunas(comunasData);
            } catch (err) {
                console.error("Error cargando listas:", err);
            }
        };
        fetchData();
    }, []);

    const handleRegionChange = (e) => {
        const selectedRegionId = parseInt(e.target.value);
        
        let nuevoFormData = { 
            ...formData, 
            regionId: e.target.value,
            comunaId: '', 
            errorRegion: e.target.value ? "" : "Selecciona una región",
            errorComuna: "Selecciona una comuna" 
        };
        setFormData(nuevoFormData);

        if (selectedRegionId) {
            const filtradas = todasLasComunas.filter(comuna => 
                comuna.region && comuna.region.id === selectedRegionId
            );
            setComunasFiltradas(filtradas);
        } else {
            setComunasFiltradas([]);
        }
    };

    const handleRegister = async () => {
        setErrorMessage('');
        
        const clienteData = {
            nombre: formData.nombre,
            email: formData.email,
            contrasena: formData.contrasena,
            telefono: formData.telefono,
            direccion: formData.direccion,
            comuna: { id: parseInt(formData.comunaId) }, 
            rol: { id: 2 }     
        };

        try {
            await UserService.register(clienteData);
            navigate("/");
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al registrar.";
            setErrorMessage(errorMsg);
        }
    };
    
    const formInputs = [
        {
            id: 'nombre',
            type: 'text',
            label: 'Nombre Completo',
            value: formData.nombre,
            error: formData.errorNombre,
            onChange: (e) => setFormData({ ...formData, nombre: e.target.value, errorNombre: e.target.value ? "" : "Requerido" })
        },
        {
            id: 'email',
            type: 'text',
            label: 'Correo',
            value: formData.email,
            error: formData.errorEmail,
            onChange: (e) => {
                let error = "";
                if (!e.target.value.includes("@")) error = "Correo inválido";
                if (e.target.value.length === 0) error = "Requerido";
                setFormData({ ...formData, email: e.target.value, errorEmail: error });
            }
        },
        {
            id: 'telefono',
            type: 'text',
            label: 'Teléfono',
            value: formData.telefono,
            error: formData.errorTelefono,
            onChange: (e) => setFormData({ ...formData, telefono: e.target.value, errorTelefono: e.target.value ? "" : "Requerido" })
        },
        {
            id: 'direccion',
            type: 'text',
            label: 'Dirección',
            value: formData.direccion,
            error: formData.errorDireccion,
            onChange: (e) => setFormData({ ...formData, direccion: e.target.value, errorDireccion: e.target.value ? "" : "Requerido" })
        },
        {
            id: 'region',
            type: 'select', 
            label: 'Región',
            value: formData.regionId,
            options: listaRegiones,
            error: formData.errorRegion,
            onChange: handleRegionChange 
        },
        {
            id: 'comuna',
            type: 'select', 
            label: 'Comuna',
            value: formData.comunaId,
            options: comunasFiltradas, 
            error: formData.errorComuna,
            onChange: (e) => setFormData({ 
                ...formData, 
                comunaId: e.target.value, 
                errorComuna: e.target.value ? "" : "Selecciona una comuna" 
            })
        },
        {
            id: 'contrasena',
            type: 'password',
            label: 'Contraseña',
            value: formData.contrasena,
            error: formData.errorContrasena,
            onChange: (e) => setFormData({ ...formData, contrasena: e.target.value, errorContrasena: e.target.value ? "" : "Requerido" })
        }
    ];

    const isFormValid = !Object.keys(formData).some(key => key.startsWith('error') && formData[key] !== "");

    return (
        <Container className="wrapper">
            <Text children="Crear Cuenta" variant="h1" className="text-center my-4"></Text>
            <Row className="justify-content-center">
                <Col className="col-md-6 my-4">
                    <Card>
                        <Card.Body>
                            <Form inputs={formInputs} />
                            
                            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                            <div style={{paddingTop: "1rem"}}>
                                <Button 
                                    id="boton-registro" 
                                    type="submit" 
                                    children="Registrarse" 
                                    onClick={handleRegister} 
                                    disabled={!isFormValid}
                                />
                                <div className="mt-2 text-center"><a href="login">¿Ya tienes cuenta?</a></div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;