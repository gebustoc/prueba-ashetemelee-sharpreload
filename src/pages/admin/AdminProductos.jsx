import { useState,useEffect } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import ProductosService from "../../services/ProductosService.jsx";
import { Container, Table } from "react-bootstrap";
import EditorItemNames from "../../../EditorThings/EditorItemNames.jsx";

function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const options={id:{noedit:true}};
    let items = [];
    let keys = []

    useEffect(() => {
        ProductosService.getAllProductos()
            .then((data) => {
                setProductos(data)
            }).
            catch((err) => console.error("Error:", err));
    }, []);

    for (const producto of productos){
        items.push(EditorComponent(producto,options));
        keys = Object.keys(producto)

    }
    return (
        <div className="wrapper">
            {items}
        </div> 
    
    );


}

export default AdminProductos;