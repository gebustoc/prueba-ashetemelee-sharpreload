import React, {useState} from 'react'
import Text  from '../components/atoms/Text'
import Form from '../components/molecules/Form'
import Button from '../components/atoms/Button'
import { Container } from 'react-bootstrap'

function Contacto(){
    const initialFormData = {
        name: '',
        email: '',
        mensaje: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const formInputs = [
        {
            id: 'name',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingresa tu nombre',
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
        },
        {
            id: 'email',
            type: 'email',
            label: 'Correo',
            placeholder: 'Ingresa tu correo',
            value: formData.email,
            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
        },
        {
            id: 'mensaje',
            type: 'textarea',
            label: 'Mensaje',
            placeholder: 'Ingrese el mensaje',
            rows: 3,
            value: formData.mensaje,
            onChange: (e) => setFormData({ ...formData, mensaje: e.target.value }),
        },
    ];

    const handleSubmit = () => {
        const message = `Nombre: ${formData.name}\nCorreo: ${formData.email}\nMensaje: ${formData.mensaje}`;
        alert(message);
    };

    const handleClear = () => {
        setFormData(initialFormData);
    };

    return (
        <Container className="wrapper my-3">
            <Text variant="h1">Contacto</Text>
            <Text variant="p">Llena el formulario para contactarnoss</Text>
            <Form inputs={formInputs} />
            <div className="mt-3">
                <Button variant="primary" onClick={handleSubmit} className="me-2">
                    Enviar
                </Button>
                <Button variant="secondary" onClick={handleClear}>
                    Limpiar
                </Button>
            </div>
        </Container>
    );
}

export default Contacto;