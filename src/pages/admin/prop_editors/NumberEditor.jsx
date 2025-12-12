import Text from "../../../components/atoms/Text";

//{ children, variant = 'p', className }
function NumberEditor({objKey,obj}) {
    console.log(objKey," ",obj)
    let value = obj[objKey];
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <Text children={objKey}></Text>
            <input type="number" defaultValue={value} onChange={
                event=>{obj[objKey] =event.target.value}
            }/>
        </div>

    );


}

export default NumberEditor;