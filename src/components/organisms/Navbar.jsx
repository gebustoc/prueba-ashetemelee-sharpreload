import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from '../atoms/Button';

function NavBar() {
 return (
   <Navbar bg="dark" variant="dark" expand="lg">
     <Container>
       <Navbar.Brand href="/">PseTiendapulenta</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav"/>
       <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-between w-100'>
         <Nav className="me-auto">
           <Nav.Link href="/">Inicio</Nav.Link>
           <Nav.Link href="/products">Productos</Nav.Link>
           <Nav.Link href="/us">Nosotros</Nav.Link>
           <Nav.Link href="/blog">Blog</Nav.Link>
           <Nav.Link href="/Contacto">Contacto</Nav.Link>
         </Nav>
          <Nav className="ms-auto">
            <Button className="btn" href="/login">Iniciar Sesión</Button>
            <Button className="btn ms-2" href="/register">Registrarse</Button>
          </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>
 );
}

export default NavBar;