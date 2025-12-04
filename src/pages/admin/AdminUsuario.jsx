import { useEffect, useState } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import UserService from "../../services/UserService.jsx";
import { Button, Container } from "react-bootstrap";
import comunaService from "../../services/ComunaService.jsx";
import RolService from "../../services/RolService.jsx";




function AdminUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [roles, setRoles] = useState([]);

    const [reload,setReload] = useState(false) // should probably be unified with stateHack
    const [stateHack,setHack] = useState(false) // thing to force state updates when addded/removed stuff

    if (!UserService.isAdmin()) return(<Container className="wrapper"></Container>);

    const options={
        id:{noedit:true},
        carrito:{skip:true},
        rol:{
            override:function (transfms,tableToEdit,key,onChange){
                let roleOptions = [];
                for (const rol of roles) {
                    roleOptions.push((<option value={rol.id} >{rol.nombreRol}</option>))
                }
                return (
                    <select name="Rol usuario" defaultValue={tableToEdit.rol.id} onChange={e=>{onChange(key,{id:e.target.value})}}
                    
                    >{roleOptions}</select>
                );
            
            }            
        },
        comuna:{
            override:function (transfms,tableToEdit,key,onChange){
                let roleOptions = [];
                for (const rol of comunas) {
                    roleOptions.push((<option value={rol.id} >{rol.nombre}</option>))
                }
                return (
                    <select name="comuna usuario" defaultValue={tableToEdit.rol.id} onChange={e=>{onChange(key,{id:e.target.value})}}
                    
                    >{roleOptions}</select>
                );
            
            }            
        }
    };


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

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        //table,transforms,extraComponents,onChange
        items.push(
            EditorComponent(
                usuario,
                options,
                
                <div style={{display:"flex"}}>
                    <Button onClick={()=>{
                        usuario.carrito = ""
                        UserService.updateCliente(usuario.id,usuario).catch((err) => console.error("Error:", err));
                    }}>Hacer Cambios</Button>,
                    
                    <Button onClick={()=>{
                        if (confirm("Borrar Cuenta?")){
                            usuarios.splice(i,1)
                            UserService.deleteUsuario(usuario.id)         
                            setHack(!stateHack)
                        }
                    }}>🗑</Button>                                    
                </div>,

                (k,v)=>{
                    usuario[k] = v
                    setHack(!stateHack) // most dogshit solution ever
                }

        ));
            
    }


    return (
        <div className="wrapper">
            {items}

            <Button onClick={()=>{
                if (confirm("Crear Cuenta?")){
                    UserService.register({
                        "nombre": "usuario pulento ",
                        "email": `${Math.floor(Math.random()*32767)}@email.cl`,
                        "telefono": "1234567890",
                        "direccion": "Av. Siempre Viva",
                        "contrasena": "devilsurvivor",
                        "comuna": {
                            "id": 22,                
                            "nombre": "Maipú",
                            "region": {"id": 7,"nombre": "Region Metropolitana"}},
                            "carrito":"",
                            "rol": {"id": 2}
                        })
                    setReload(!reload)
                        
                        
                }

            }}>Crear usuario.</Button>
        </div> 
    );


}

export default AdminUsuario;