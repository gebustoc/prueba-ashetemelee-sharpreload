import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ProductosService from "../services/ProductosService";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import Image from "../components/atoms/Image";
import { useState, useEffect } from "react";

function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLogged = !!localStorage.getItem("cur_user");

  useEffect(() => {
    ProductosService.getProductoById(id)
      .then(data => {
        setProducto(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando producto:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="wrapper py-5">
        <h3>Cargando producto...</h3>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="wrapper py-5">
        <h1>No se pudo encontrar el producto</h1>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!isLogged) {
      alert("Debe iniciar sesión para añadir productos al carrito.");
      return;
    }

    alert(`Producto "${producto.nombre}" añadido al carrito (demo).`);
  };

  return (
    <Container className="wrapper">
      <Row className="align-items-center mb-5 p-3">
        <Col>
          <Image 
          className="img-fluid-border" 
          src={"https://m.media-amazon.com/images/I/51N7-BydsDL.jpg"} 
          alt={producto.nombre}
          />
        </Col>

        <Col>
          <Text variant="h1" className="py-4" children={producto.nombre} />

          <Text
            variant="h2"
            className="py-4"
            children={`$${new Intl.NumberFormat("es-CL").format(producto.precio)}`}
          />

          <Col style={{ display: "flex", gap: ".5rem" }}>

            <Button
              className="btn btn-primary"
              children={`Comprar (${producto.stock} restantes)`}
              disabled={!isLogged || producto.stock <= 0}
              onClick={() => alert("Debe iniciar sesión para comprar")}
            />
            <Button
              className="btn btn-primary"
              children="Añadir al carrito"
              onClick={handleAddToCart}
            />
          </Col>

          <Text variant="h3" className="mt-4" children={producto.descripcion} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductInfo;
