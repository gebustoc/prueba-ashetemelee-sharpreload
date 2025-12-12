import { useState,useEffect } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import ProductosService from "../../services/ProductosService.jsx";
import { Button, Container } from "react-bootstrap";
import CategoriaService from "../../services/CategoriaService.jsx";
import CategoryDropDown from "../../../EditorThings/specialists/CategoryDropDown.jsx";
import UserService from "../../services/UserService.jsx";
import AdminRow from "./prop_viewers/AdminRow.jsx";
import TextViewer from "./prop_viewers/TextViewer.jsx";
import TextEditor from "./prop_editors/TextEditor.jsx";
import Text from "../../components/atoms/Text.jsx";




function AdminCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [stateHack,setHack] = useState(false)
    const [reload,setReload] = useState(false);
    const [editedCate,setEditedCategoria] = useState(null)
    const displayMethods = {
        id:TextViewer,
        nombreCategoria:TextViewer
    }
    let itemRoots = [];

    useEffect(
        ()=>{
            CategoriaService.getAllCategorias().then((data) => {
                data.sort((a,b)=>a.id > b.id);
                setCategorias(data);
            }).catch((err) => console.error("Error:", err));
        },
        [reload]
    )
    // dogshit hack for a load screen (too lazy for another state)
    if (editedCate != null && categorias.length == 0){
        return (
            <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>
                <Text children={"Haciendo cambios. porfavor espere"}/>
            </div> 
        );
    }

    if (editedCate != null){
        const ReloadTurnBack = ()=>{
            setReload(!reload);
            setEditedCategoria(null);   
        }

        return (
            <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>    
                <Text children={"id: "+editedCate.id}/>

                <TextEditor obj={editedCate} objKey={"nombreCategoria"}/>
                <div style={{gap:"2rem",display:"flex",flexDirection:"column"}}>
                    <Button onClick={()=>{
                        setCategorias([]);
                        uploadCategoria(editedCate,ReloadTurnBack)
                    }}>Hacer Cambios</Button>
                    <Button onClick={()=>{setEditedCategoria(null)}}>Cancelar.</Button>
                </div>
            </div> 
        );
    }
    
    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        itemRoots.push(AdminRow(categoria,displayMethods,()=>{
            let cate = JSON.parse(JSON.stringify(categoria));
            console.log(cate)
            setEditedCategoria(cate)

        }
        
        ));

        }

   return (
        <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>
            {itemRoots}
            <Button onClick={
                ()=>{
                    setEditedCategoria({id:null,nombre:""})
                }
            }>Crear Categoria.</Button>
        </div> 
    );


}

function uploadCategoria(editedProd,finish){
    if (editedProd.id == null){
        CategoriaService.createCategoria(editedProd).then(finish).catch((err)=>{console.error(err);finish()})  
        return
    }
    CategoriaService.updateCategoria(editedProd.id,editedProd).then(finish).catch((err)=>{console.error(err);finish()})  
}





export default AdminCategorias;