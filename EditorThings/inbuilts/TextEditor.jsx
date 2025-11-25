import { useState } from "react";


function TextEditor(transfms,tableToEdit,key,onChange){
    return (
        <input  
            name=""
            value={tableToEdit[key]}
            id={key} 
            disabled={transfms["noedit"] || false} 
            onChange={event => {onChange(key,event.target.value)}}
        /> 
    );
}
export default TextEditor;
