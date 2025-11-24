import { useState } from "react";


function TextEditor(transfms,tableToEdit,key){
    return (
        <input  
            name=""
            value={tableToEdit[key]}
            id={key} 
            disabled={transfms["noedit"] || false} 
            onChange={event => {
                tableToEdit[key] = toString(event.target.value)
            }}        
        /> 
    );
}
export default TextEditor;