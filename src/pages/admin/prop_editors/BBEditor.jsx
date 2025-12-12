import { Button } from "react-bootstrap";
import Text from "../../../components/atoms/Text";

function BBEditor({objKey,obj,refresh}) {
    console.log(objKey," ",obj)
    let value = obj[objKey];
    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <Text children={objKey}></Text>
            <img src={value} alt="" />
            <div style={{display:"flex", gap:"1rem"}}>
                <label htmlFor="fileInput">Subir Foto (32MB) max</label>
                <input type="file" id="fileInput" accept="image/*" onChange={(event)=>{
                    obj.bbLocal = event.target.files[0];
                    console.log(obj.bbLocal)
                }}/>
            </div>


            <input defaultValue={value} onChange={event=>{obj[objKey]=event.target.value; refresh()}} maxLength={7}/>
        </div>

    );


}

export default BBEditor;