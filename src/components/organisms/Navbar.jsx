
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from '../atoms/Button';
import LoginButtons from '../molecules/LoginButtons';

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
           <Nav.Link href="/contact">Contacto</Nav.Link>   
         </Nav>
         <div className='d-flex flex-row-reverse'><LoginButtons/></div>
       </Navbar.Collapse>
     </Container>
     
   </Navbar>
 );
}

export default NavBar;