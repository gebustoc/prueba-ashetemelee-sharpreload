import { Card, Container } from "react-bootstrap";



function Nosotros(){
    return (
        <Container class="wrapper">
            <Card>
                <Card.Img src="https://www.emb.cl/channelnews/picarti/201804/perfilpcfactory2.jpg"></Card.Img>
                <Card.Title>Nosotros</Card.Title>
                <Card.Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti optio, illum voluptate commodi fuga inventore modi. Voluptas provident accusantium unde saepe, ullam nisi ipsam, natus repellat excepturi voluptatum exercitationem recusandae! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, non, maiores odit maxime consectetur laboriosam labore neque enim obcaecati perspiciatis atque libero vitae iste dolorum corporis distinctio. Debitis, sequi tempora. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt soluta cumque molestias voluptas quasi illum mollitia tempora dolorem sint quas ullam perferendis, officiis totam deserunt? Expedita numquam recusandae eum neque.</Card.Text>
                <Card.Text className="text-body-secondary">Gracias</Card.Text>
            </Card>
        </Container>
    );

}

export default Nosotros;