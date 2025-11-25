import TextEditor from "./inbuilts/TextEditor";
import SpinBoxEditor from "./inbuilts/SpinBoxEditor";







function generateEditor(type,transfms,tableToEdit,key,onChange) {
    if (transfms["override"] != undefined){
        return transfms.override(transfms,tableToEdit,key,onChange);
    }
    if (transfms["skip"] != undefined){
        return null
    }

    switch (type) {
        case "number":
            return SpinBoxEditor(transfms,tableToEdit,key,onChange);
        case "string":
            return TextEditor(transfms,tableToEdit,key,onChange);
            
            

        default:
            return (<p>{`Error! tipo:${type} no esta soportado todavia :(`}</p>);
    }    

}


function EditorComponent(table,transforms,extraComponents,onChange){
    let editors = [];
    for (const key in table) {
        let transfms = transforms[key] || {}
        let type = typeof(table[key])
        let ed = generateEditor(type,transfms,table,key,onChange)
        if ((ed) == null) continue
        editors.push((
            <div style={{alignContent:"center"}}>
                <div style={{display:"flex"}}>
                    <div style={{alignContent:"center"}}>{key}</div>
                    {ed}
                </div>
            </div>
        ));
        
    }     

    return (
        <div style={{display:"flex", gap:"2rem", padding:"1rem"}}>
            {editors}
            {extraComponents}
        </div>

    );

}
export default EditorComponent;