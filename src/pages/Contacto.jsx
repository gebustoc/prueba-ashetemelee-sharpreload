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
        errorName:'el nombre no puede estar vacio',
        errorEmail:'el correo no puede estar vacio',
        errorMessage:'el mensaje no puede estar vacio'
        
    };

    const [formData, setFormData] = useState(initialFormData);

    const formInputs = [
        {
            id: 'name',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingresa tu nombre',
            value: formData.name,
            error: formData.errorName,
            onChange: (e) => setFormData({ ...formData, name: e.target.value, errorName: e.target.value.length ? "" : "el nombre no puede estar vacio"})
        },
        {
            id: 'email',
            type: 'email',
            label: 'Correo',
            placeholder: 'Ingresa tu correo',
            value: formData.email,
            error: formData.errorEmail,
            onChange: (e) => {
                let error = "";
                let correovali = e.target.value.split("@").pop();
                if (correovali === undefined || correovali !== "duocuc.cl")error = "el correo no es un correo duoc valido";
                if (e.target.value.length == 0) error = "el correo no puede estar vacio";



                setFormData({ ...formData, email: e.target.value, errorEmail:error });
            }
        },
        {
            id: 'mensaje',
            type: 'textarea',
            label: 'Mensaje',
            placeholder: 'Ingrese el mensaje',
            rows: 3,
            value: formData.mensaje,
            error: formData.errorMessage,
            onChange: (e) => setFormData({ ...formData, mensaje: e.target.value, errorMessage: e.target.value.length ? "" : "el nombre no puede estar vacio"}),
        },
    ];

    const handleSubmit = () => {
        console.log(formData)
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
                <Button variant="primary" onClick={handleSubmit} className="me-2" disabled={(formData.errorMessage+formData.errorEmail+formData.errorName) !== ""}>
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