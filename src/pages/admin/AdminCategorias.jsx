import { useState,useEffect } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import ProductosService from "../../services/ProductosService.jsx";
import { Button } from "react-bootstrap";
import CategoriaService from "../../services/CategoriaService.jsx";
import CategoryDropDown from "../../../EditorThings/specialists/CategoryDropDown.jsx";
import UserService from "../../services/UserService.jsx";




function AdminCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [loaded, setLoad] = useState(false);
    const [stateHack,setHack] = useState(false)
    
    if (!UserService.isAdmin()) return(<Container className="wrapper"></Container>);


    const options={
        id:{noedit:true}
       
    };
    
    let items = [];

    // este check es para que funcione, podria ser un efecto pero ya hize esta wea (sufrimiento con estados)
    if (!loaded){
        CategoriaService.getAllCategorias().then((data) => {
            data.sort((a,b)=>a.id > b.id)
            setCategorias(data);
            setLoad(true)
        }).catch((err) => console.error("Error:", err));
    } 


    // hell, deberia ser sus propias weas xd
    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        items.push(
            EditorComponent(
                categoria,
                options,
                <div style={{display:"flex"}}>
                    <Button onClick={()=>{
                        CategoriaService.updateCategoria(categoria.id,categoria).catch((err) => console.error("Error:", err));

                    }}>Hacer Cambios</Button>,
                    <Button onClick={()=>{
                        if (confirm("Borrar Elemento?")){
                            categorias.splice(i,1)
                            setHack(!stateHack)
                            CategoriaService.deleteCategoria(categoria.id)         
                        }

                        
                    }}>🗑</Button>
                                    
                </div>,

                (k,v)=>{
                    categoria[k] = v
                    setHack(!stateHack) // most dogshit solution ever
                }

        ));
            
    }


    return (
        <div className="wrapper">
            {items}

            <Button onClick={()=>{
                CategoriaService.createCategoria({"nombreCategoria": "Mi Categoria"})
                setLoad(false)


            }}>Crear categoria.</Button>
        </div> 
    );


}

export default AdminCategorias;