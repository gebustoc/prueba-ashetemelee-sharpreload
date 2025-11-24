import TextEditor from "./inbuilts/TextEditor";
import SpinBoxEditor from "./inbuilts/SpinBoxEditor";







function generateEditor(type,transfms,tableToEdit,key) {
    if (transfms["override"] != undefined){
        return transfms.override(transfms,tableToEdit,key);
    }
        
    switch (type) {
        case "number":
            return SpinBoxEditor(transfms,tableToEdit,key);
        case "string":
            return TextEditor(transfms,tableToEdit,key);
            
            

        default:
            return (<p>{`Error! tipo:${type} no esta soportado todavia :(`}</p>);
    }    

}


function EditorComponent(table,transforms,extraComponents){
    let editors = [];
    for (const key in table) {
        let transfms = transforms[key] || {}
        let type = typeof(table[key])

        editors.push((
            <div style={{alignContent:"center"}}>
                <div style={{display:"flex"}}>
                    <div style={{alignContent:"center"}}>{key}</div>
                    {generateEditor(type,transfms,table,key)}
                </div>
            </div>
        ));
        
    }     

    return (
        <div style={{display:"flex"}}>
            {editors}
            {extraComponents}
        </div>

    );

}
export default EditorComponent;