import { useEffect, useState } from "react";


function SpinBoxEditor(transfms,tableToEdit,key,onChange){
    return (
        <input 
            type="number" 
            name=""
            value={tableToEdit[key]}
            id={key} 
            min={transfms["min"] || -Infinity} 
            max={transfms["max"] || Infinity} 
            disabled={transfms["noedit"] || false} 
            onChange={event => {
                if (isNaN(Number.parseInt(event.target.value)) ){return;}
                onChange(key,Number.parseInt(event.target.value))
            }}

            /> 
    );
}

export default SpinBoxEditor;