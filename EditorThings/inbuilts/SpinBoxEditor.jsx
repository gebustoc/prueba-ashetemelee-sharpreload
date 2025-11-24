import { useState } from "react";


function SpinBoxEditor(transfms,tableToEdit,key){
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
                if (isNaN(Number.parseInt(event.target.value)) ){
                    return
                }

                tableToEdit[key] = Number(event.target.value)
            }}

            /> 
    );
}

export default SpinBoxEditor;