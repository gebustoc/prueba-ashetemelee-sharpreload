import { Button } from "react-bootstrap";
import Text from "../../../components/atoms/Text";

function AdminRow(producto,displayMethods,onEdit){
    let things = [];

    for (const key in producto) {
        if (displayMethods[key] == undefined) continue;
        things.push(
            <div>
                <Text children={key}/>
                {displayMethods[key](producto[key])}
            </div>
        )
    }
    things.push(<Button onClick={onEdit}>Editar</Button>)
    
    return <div style={{display:"flex", gap:"1rem"}}>{things}</div>;

}

export default AdminRow;