import { Button } from "react-bootstrap";

function CategoryDropDown(categorias,key,tableToEdit,onChange,idx){
    console.log(tableToEdit)
    let selects = []
    for (const element of categorias) {
        selects.push((<option value={element.id} >{element.nombreCategoria} </option>))
    }
    return (
        <div style={{display:"flex"}}>
            <select name="categorias" defaultValue={tableToEdit[key][idx].id} onChange={
                e=>{
                    tableToEdit[key][idx].id = e.target.value

                    //elementCategorias[idx].id = e.target.value
                    onChange(key,tableToEdit[key])

                }
                
            }>{selects} </select>
            <Button onClick={()=>{
                tableToEdit[key].splice(idx,1) // where the fuck is this comming from??
                onChange(key,tableToEdit[key])}}>🗑</Button>
        </div>
    );

}
export default CategoryDropDown;
