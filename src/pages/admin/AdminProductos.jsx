import { useState,useEffect } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import ProductosService from "../../services/ProductosService.jsx";
import { Button,Container } from "react-bootstrap";
import CategoryEditor from "../../../EditorThings/specialists/CategoryDropDown.jsx";
import CategoriaService from "../../services/CategoriaService.jsx";
import CategoryDropDown from "../../../EditorThings/specialists/CategoryDropDown.jsx";
import UserService from "../../services/UserService.jsx";





function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [stateHack,setHack] = useState(false)
    const [listaCategorias,setListaCategorias] = useState([])
    const [reload,setReload] = useState(false)

    if (!UserService.isAdmin()) return(<Container className="wrapper"></Container>);

    const options={
        id:{noedit:true},
        categorias:{
            override:function (transfms,tableToEdit,key,onChange){
                let elementCategorias = tableToEdit[key];
                let uiElements = []
                for (let i=0; i < elementCategorias.length; i++) {
                    const categoria = elementCategorias[i]
                    uiElements.push(
                        <div style={{display:"inline-flex", paddingTop:".5rem",paddingBottom:".5rem" }}>
                            {CategoryDropDown(listaCategorias,key,tableToEdit,onChange,i)}
                        </div>)
                }
            
            
                return (
                    <div style={{display:"grid"}}>
                        
                        <Button onClick={()=>{
                            elementCategorias.push({id:0})
                            onChange(key,elementCategorias)
                        }}>+</Button>
                        {uiElements}
                    </div>
                );
            
            }
        }
    };
    let items = [];
    useEffect(()=>{
        CategoriaService.getAllCategorias().then((data) => {
            data.sort((a,b)=>a.id > b.id)
            setListaCategorias(data);
        }).catch((err) => console.error("Error:", err));

        ProductosService.getAllProductos().then((data) => {
            data.sort((a,b)=>a.id < b.id)
            setProductos(data);
        }).catch((err) => console.error("Error:", err));
    },[reload])


    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        items.push(
            EditorComponent(
                producto,
                options,
                <div style={{display:"flex"}}>
                    <Button onClick={()=>{ProductosService.updateProducto(producto.id,producto).catch((err) => console.error("Error:", err));}}>Hacer Cambios</Button>,
                    <Button onClick={()=>{
                        if (confirm("Borrar Elemento?")){
                            productos.splice(i,1)
                            setHack(!stateHack)
                            ProductosService.deleteProducto(producto.id)         
                        }

                        
                    }}>🗑</Button>
                                    
                </div>,

                (k,v)=>{
                    producto[k] = v
                    setHack(!stateHack) // most dogshit solution ever
                }

        ));
            
    }


    return (
        <div className="wrapper">
            {items}

            <Button onClick={()=>{
                ProductosService.createProducto({
                    "nombre": "Producto",
                    "descripcion": "Descripción del producto",
                    "precio": 0,
                    "stock": 0,
                    "categorias": []
                })
                setReload(!reload)


            }}>Crear producto.</Button>
        </div> 
    );


}

export default AdminProductos;