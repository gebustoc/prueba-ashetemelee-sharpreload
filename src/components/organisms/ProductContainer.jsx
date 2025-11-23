import React, { useEffect, useState } from "react";
import ProductosService from "../../services/ProductosService";
import { Row, Col, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";

function ProductContainer({showFilters = true}) {
  const [productos, setProductos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoria, setCategoria] = useState("todas");
  const [orden, setOrden] = useState("none");

  useEffect(() => {
    ProductosService.getAllProductos()
      .then((data) => {
        setProductos(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    let result = [...productos];

    if (categoria !== "todas") {
      result = result.filter((p) =>
        p.categorias.some((c) => c.nombreCategoria === categoria)
      );
    }

    if (orden === "asc") {
      result.sort((a, b) => a.precio - b.precio);
    } else if (orden === "desc") {
      result.sort((a, b) => b.precio - a.precio);
    }

    setFiltered(result);
  }, [categoria, orden, productos]);

  const categoriasUnicas = [
    ...new Set(
      productos.flatMap((p) =>
        p.categorias.map((c) => c.nombreCategoria)
      )
    ),
  ];

  return (
    <div className="my-4">
      {showFilters && (
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {categoriasUnicas.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="none">Sin orden</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </Form.Select>
        </Col>
      </Row>
      )}
      <Row>
        {filtered.map((prod) => (
          <Col md={4} key={prod.id} className="mb-4">
            <ProductCard product={prod} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductContainer;
