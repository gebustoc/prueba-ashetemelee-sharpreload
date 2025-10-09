import { Container } from "react-bootstrap";


function Wrapper(children) {
    return (
        <Container className="wrapper">
            {children}
        </Container>
    );
}