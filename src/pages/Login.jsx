import Form from "../components/molecules/Form";
import { useState } from "react";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import { Container } from "react-bootstrap";

function Login() {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const formInputs = [
    {
      id: "email",
      type: "email",
      label: "Correo Electronico",
      placeholder: "Ingresa tu correo",
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      id: "password",
      type: "password",
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
    },
  ];
  return (
    <Container className="wrapper py-5">
      <Text variant="h1" className="mb-4 text-center">
        Bienvenido
      </Text>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Form inputs={formInputs} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
