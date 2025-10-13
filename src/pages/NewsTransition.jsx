import { useParams } from "react-router-dom";
import NewsPage from "./NewsPage";
import NewsPage2 from "./NewsPage2";
import Text from "../components/atoms/Text";
import { Container } from "react-bootstrap";
import Image from "../components/atoms/Image";
import { useState } from "react";


function NewsTransition() {
    const { id } = useParams();
    const intID = parseInt(id)

    const [wastingmyTimeRN, setWastingmyTimeRN] = useState(false);
    const Paiges = [
        NewsPage,
        NewsPage2,
        ()=>{
            return <Container className="row align-items-center">
            <Text variant="h1" children="peep my miku pixelart thing idk"/>
            <Image src="/./img/image.png" alt="" />
            </Container>
        },
        ()=>{
            return (
                <Container className="row align-items-center">
                    {(()=>{if (wastingmyTimeRN) return <Text variant="h1" children="weon ql malo"/>}).call()}
                    <video controls onEnded={()=>setWastingmyTimeRN(true)}>
                    <source src="/./img/funny.mp4" type="video/mp4"/>
                    </video> 
                </Container>
            );
        }
    ]

    if (isNaN(parseInt(intID)) || (Paiges[intID] === undefined)){
        return (<Container className="wrapper"><Text variant="h1" children="No se pudo encontrar el articulo que buscaba :("/></Container>);
    }

    return (
        <Container className="wrapper">        
            {Paiges[intID]()}
        </Container>
    );


}

export default NewsTransition;