import { useState,useEffect } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import ProductosService from "../../services/ProductosService.jsx";
import { Button,Container } from "react-bootstrap";
import CategoryEditor from "../../../EditorThings/specialists/CategoryDropDown.jsx";
import CategoriaService from "../../services/CategoriaService.jsx";
import CategoryDropDown from "../../../EditorThings/specialists/CategoryDropDown.jsx";
import UserService from "../../services/UserService.jsx";
import TextViewer from "./prop_viewers/TextViewer.jsx";
import Text from "../../components/atoms/Text.jsx";
import CategoriaViewer from "./prop_viewers/CategoriaVIewer.jsx";
import AdminRow from "./prop_viewers/AdminRow.jsx";
import { Input } from "../../components/atoms/Input.jsx";
import DynamicForm from "../../components/molecules/Form.jsx";
import NumberEditor from "./prop_editors/NumberEditor.jsx";
import TextEditor from "./prop_editors/TextEditor.jsx";
import CategoriaEditor from "./prop_editors/CategoriaEditor.jsx";
import BBEditor from "./prop_editors/BBEditor.jsx";
import { uploadToImgBB } from "../../services/uploadImage.js";





function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [stateHack,setHack] = useState(false) // hack to force reloading
    const [listaCategorias,setListaCategorias] = useState([])
    const [reload,setReload] = useState(false)
    const [editedProd,setEditedProd] = useState(null)
    
    let itemRoots = [];
    const displayMethods = {
        id:TextViewer,
        nombre:TextViewer,
        descripcion:TextViewer,
        precio:TextViewer,
        stock:TextViewer,
        categorias:CategoriaViewer,
        bbID:value=>{
            return (
                <div>
                    <img src="https://pbs.twimg.com/media/G75iKGiWUAAvW9A?format=png&name=small" alt="" width={64} />
                    <Text children={toString(value)}></Text>
                </div>
            );
        }   
    }

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

    // dogshit hack for a load screen (too lazy for another state)
    if (editedProd != null && productos.length == 0){
        return (
            <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>
                <Text children={"Haciendo cambios. porfavor espere"}/>
            </div> 
        );
    }
    

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        itemRoots.push(AdminRow(producto,displayMethods,()=>{setEditedProd(JSON.parse(JSON.stringify(producto)))}));
    }




    if (editedProd != null){
        return (

            <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>    
                <Text children={"id: "+editedProd.id}/>

                <TextEditor obj={editedProd} objKey={"nombre"}/>
                <TextEditor obj={editedProd} objKey={"descripcion"}/>
                <NumberEditor obj={editedProd} objKey={"precio"}/>
                <NumberEditor obj={editedProd} objKey={"stock"}/>
                <CategoriaEditor obj={editedProd} objKey={"categorias"} categoriasValidas={listaCategorias} refresh={()=>{setHack(!stateHack)}} />
                <BBEditor obj={editedProd} objKey={"bbID"} refresh={()=>{setHack(!stateHack)}} ></BBEditor>

                <div style={{gap:"2rem",display:"flex",flexDirection:"column"}}>
                    <Button onClick={()=>{
                        console.log(editedProd)
                        setProductos([]);
                        if (editedProd.bbLocal != undefined){
                            //await 
                            uploadToImgBB(editedProd.bbLocal).then(
                                (data)=>{
                                    console.log(data);
                                    editedProd.bbID = data.url;

                                    ProductosService.updateProducto(editedProd.id,editedProd).then(()=>{
                                        setReload(!reload);
                                        setEditedProd(null);
                                    }).catch(
                                        (err)=>{
                                            console.error(err)
                                            setReload(!reload);
                                            setEditedProd(null);
                                        }
                                    )
                                }
                            ).catch(
                                (err)=>{
                                    console.error(err)
                                    setReload(!reload);
                                    setEditedProd(null);
                                }
                            )
                            return;

                        }
                        

                        ProductosService.updateProducto(editedProd.id,editedProd).then(()=>{
                            setReload(!reload);
                            setEditedProd(null);
                        }).catch(
                            (err)=>{
                                console.error(err)
                                setReload(!reload);
                                setEditedProd(null);
                            }
                        )



                    }}>Hacer Cambios</Button>
                    <Button onClick={()=>{setEditedProd(null)}}>Cancelar.</Button>
                </div>
            </div> 
        );
    }

    return (
        <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>
            {itemRoots}
        </div> 
    );

}





export default AdminProductos;


