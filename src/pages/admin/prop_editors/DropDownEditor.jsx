import { Button } from "react-bootstrap";
import Text from "../../../components/atoms/Text";

//{ children, variant = 'p', className }
function DropDownEditor({objKey,obj, categoriasValidas,subkey, namekey}) {
    let value = obj[objKey];
    let selects = []
    for (const element of categoriasValidas) {
        console.log(element, element[namekey])
        selects.push((<option value={element.id} >{element[namekey]} </option>))
    
    }
    
    return (
        <div style={{display:"flex",flexDirection:"column",gap:".5rem"}}>
            <Text children={objKey}></Text>
            <StrippedCategoryDropDown selects={selects} value={value} key={subkey}></StrippedCategoryDropDown>
            
        </div>

    );


}



function StrippedCategoryDropDown({selects,value, key}){
    return (<select name="categorias" defaultValue={value[key]} onChange={e=>{value[key] = e.target.value}}>{selects} </select>);
    
}

export default DropDownEditor;