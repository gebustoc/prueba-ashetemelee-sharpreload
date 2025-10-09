import { Col, Container, Row } from "react-bootstrap";


function Footer() {
    return (
        <Container>
            <Row>
                <Col md="4">
                    <h5>Sobre Nosotros</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id libero ipsum.</p>
                </Col>
                <Col md="4">
                    <h5>Enlaces Rápidos</h5>
                    <ul className="list-unstyled">
                        <li><a href="/" className="text-white">Inicio</a></li>
                        <li><a href="/blog" className="text-white">Blog</a></li>
                        <li><a href="/contact" className="text-white">Contacto</a></li>
                    </ul>
                </Col>
            </Row>
            <div className="text-center mt-4">
                <p> 2025 Pse Enterprise. Todos los derechos reservados.</p>
            </div>
        </Container>
    );
}


export default Footer;