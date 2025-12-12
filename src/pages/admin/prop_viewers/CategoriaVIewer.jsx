import Text from "../../../components/atoms/Text";

function CategoriaViewer(value){
    let labels = [];
    for (const cate of value) {
        labels.push(<Text children={cate.nombreCategoria}/>)
    }


    //console.log(str,value)
    return <div>{labels}</div>
}

export default CategoriaViewer;