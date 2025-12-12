import { Button } from "react-bootstrap";
import Text from "../../../components/atoms/Text";

//{ children, variant = 'p', className }
function CategoriaEditor({objKey,obj, categoriasValidas,refresh}) {
    let value = obj[objKey];
    let selects = []
    let dropdowns = []
    for (const element of categoriasValidas) {selects.push((<option value={element.id} >{element.nombreCategoria} </option>))}
    for (let i = 0; i < value.length; i++) {dropdowns.push(StrippedCategoryDropDown(selects,value,i,refresh))}
    console.log(value)

    return (
        <div style={{display:"flex",flexDirection:"column",gap:".5rem"}}>
            <Text children={objKey}></Text>
            {dropdowns}
            <Button onClick={()=>{
                value.push({id: 5})
                refresh()
            }}>Añadir Categoria</Button>
        </div>

    );


}



function StrippedCategoryDropDown(selects,value,idx,refresh){
    return (
        <div style={{display:"flex"}}>
            <select name="categorias" defaultValue={value[idx].id} onChange={
                e=>{
                    value[idx].id = e.target.value
                }
                
            }>{selects} </select>
            <Button onClick={()=>{value.splice(idx,1);refresh()}}>🗑</Button>

        </div>
    );
    
}

export default CategoriaEditor;