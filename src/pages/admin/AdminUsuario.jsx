import { useEffect, useState } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import { Button, Container } from "react-bootstrap";
import comunaService from "../../services/ComunaService.jsx";
import RolService from "../../services/RolService.jsx";
import UserService from "../../services/UserService.jsx";
import Text from "../../components/atoms/Text.jsx";
import TextViewer from "./prop_viewers/TextViewer.jsx";
import AdminRow from "./prop_viewers/AdminRow.jsx";
import TextEditor from "./prop_editors/TextEditor.jsx";
import CategoriaEditor from "./prop_editors/CategoriaEditor.jsx";
import DropDownEditor from "./prop_editors/DropDownEditor.jsx";




function AdminUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [roles, setRoles] = useState([]);
    const [reload,setReload] = useState(false) // should probably be unified with stateHack
    const [stateHack,setHack] = useState(false) // thing to force state updates when addded/removed stuff
    const [editedUser,setEditedUser] = useState(null)

    const displayMethods = {
        id:TextViewer,
        nombre:TextViewer,
        email:TextViewer,
        telefono:TextViewer,
        direccion:TextViewer,
        comuna: value=>{
            return <div><Text children={value.nombre}></Text></div>
        },
        rol:value=>{
            return <div><Text children={value.nombreRol}></Text></div>
        }
    }
    let items = [];

    useEffect(()=>{
        UserService.getAllUsuarios().then((data) => {
            data.sort((a,b)=>a.id < b.id)
            setUsuarios(data);
        }).catch((err) => console.error("Error:", err));

        comunaService.getAllComunas().then((data) => {
            setComunas(data);
        }).catch((err) => console.error("Error:", err));

        RolService.getAllRoles().then((data) => {
            setRoles(data);
        }).catch((err) => console.error("Error:", err));


    },[reload])

      if (editedUser != null && editedUser.length == 0){
        return (
            <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>
                <Text children={"Haciendo cambios. porfavor espere"}/>
            </div> 
        );
    }

    if (editedUser != null){
        const ReloadTurnBack = ()=>{
            setReload(!reload);
            setEditedUser(null);   
        }

        return (
            <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>    
                <Text children={"id: "+editedUser.id}/>

                <TextEditor obj={editedUser} objKey={"nombre"}/>
                <TextEditor obj={editedUser} objKey={"email"}/>
                <TextEditor obj={editedUser} objKey={"telefono"}/>                
                <TextEditor obj={editedUser} objKey={"direccion"}/>
                <DropDownEditor obj={editedUser} objKey={"comuna"} subkey={"id"} categoriasValidas={comunas} namekey={"nombre"}/>
                <DropDownEditor obj={editedUser} objKey={"rol"} subkey={"id"} categoriasValidas={roles} namekey={"nombreRol"}/>
                
                <div style={{gap:"2rem",display:"flex",flexDirection:"column"}}>
                    <Button onClick={()=>{
                        setUsuarios([]);
                        uploadUsuario(editedUser,ReloadTurnBack)
                    }}>Hacer Cambios</Button>
                    <Button onClick={()=>{setEditedUser(null)}}>Cancelar.</Button>
                </div>
            </div> 
        );
    }


    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        items.push(AdminRow(usuario,displayMethods,()=>{setEditedUser(JSON.parse(JSON.stringify(usuario)))}));
    }


    return (
        <div className="wrapper" style={{flexDirection:"column", width:"100vw",gap:"1rem",alignItems:"center"}}>
            {items}

            <Button onClick={()=>{
                setEditedUser({
                    id:null,
                    nombre:"",
                    email: `${Math.round(Math.random()*2147483647)}@email.cl`,
                    "direccion": "Av. Siempre Viva",
                    "contrasena": "devilsurvivor",
                    "comuna": {
                        "id": 22,                
                        "nombre": "Maipú",
                        "region": {"id": 7,"nombre": "Region Metropolitana"}
                    },
                    "carrito":"",
                    "rol": {"id": 2}
                    

                })


            }}>Crear usuario.</Button>
        </div> 
    );


}

function uploadUsuario(editedUser,finish){
    if (editedUser.id == null){
        UserService.register(editedUser).then(finish).catch((err)=>{console.error(err);finish()})  
        return
    }

    UserService.updateCliente(editedUser.id,editedUser).then(finish).catch((err)=>{console.error(err);finish()})  
}


export default AdminUsuario;