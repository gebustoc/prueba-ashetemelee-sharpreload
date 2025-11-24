
function EditorItemNames({names}){
    console.log(names)
    if (names == undefined) return (<div/>);
    let nameItems = [];
    for (const name of names) {
        nameItems.push((
            <div style={{alignSelf:"center"}}>{name}</div>
        ));
        
    }     

    return (
        <div style={{display:"inline-flex"}}>
            {nameItems}
        </div>
    );

}
export default EditorItemNames;