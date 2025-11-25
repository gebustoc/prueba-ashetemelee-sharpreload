import { useState } from "react";
import EditorComponent from "../../../EditorThings/EditorComponent.jsx";
import UserService from "../../services/UserService.jsx";
import { Button } from "react-bootstrap";
import comunaService from "../../services/ComunaService.jsx";
import RolService from "../../services/RolService.jsx";




function AdminUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [roles, setRoles] = useState([]);


    const [loaded, setLoad] = useState(false);
    const [stateHack,setHack] = useState(false)



    const options={
        id:{noedit:true},
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

    if (!loaded){
        UserService.getAllUsuarios().then((data) => {
            data.sort((a,b)=>a.id < b.id)
            setUsuarios(data);
            setLoad(true)

        }).catch((err) => console.error("Error:", err));

        comunaService.getAllComunas().then((data) => {
            setComunas(data);
            setLoad(true)
        }).catch((err) => console.error("Error:", err));

        RolService.getAllRoles().then((data) => {
            setRoles(data);
            setLoad(true)
        }).catch((err) => console.error("Error:", err));


    }

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        //table,transforms,extraComponents,onChange
        items.push(
            EditorComponent(
                usuario,
                options,
                
                <div style={{display:"flex"}}>
                    <Button onClick={()=>{
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
                    setLoad(false)
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
                        "rol": {"id": 2}
                    })
                                    
                
                }

            }}>Crear usuario.</Button>
        </div> 
    );


}

export default AdminUsuario;