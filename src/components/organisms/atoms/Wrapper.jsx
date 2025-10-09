import { Container } from "react-bootstrap";


//; min_height:100vh; flex-direction:column;
//className="my-5"
function Wrapper(){
    return (
        <Container className="my-5" style={{display:"flex",minHeight:"100vh",flexDirection:"column"}}  />
    );
}

export default Wrapper;