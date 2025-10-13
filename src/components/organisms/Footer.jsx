import { Col, Container, Row } from "react-bootstrap";
import Text from "../atoms/Text";


function Footer() {
    return (
        <Container fluid className="bg-dark text-white py-4">
            <Row>
                <Col md="4">
                    <Text variant="h5"children="Sobre Nosotros"/>
                    <Text variant="p"children="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id libero ipsum."/>
                </Col>
                <Col md="4">
                    <Text variant="h5"children="Enlaces Rápidos"/>
                    <ul className="list-unstyled">
                        <li><a href="/" className="text-white">Inicio</a></li>
                        <li><a href="/blog" className="text-white">Blog</a></li>
                        <li><a href="/contact" className="text-white">Contacto</a></li>
                    </ul>
                </Col>
            </Row>
            <div className="text-center mt-4">
                <Text variant="p"children="2025 Pse Enterprise. Todos los derechos reservados."/>
            </div>
        </Container>
    );
}


export default Footer;