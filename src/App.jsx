import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Products from '../pages/products.jsx';
import {NavBar} from './components/organisms/Navbar.jsx';
import {ProductCard} from "./components/organisms/ProductCard.jsx"
import {ItemController} from "./ShittyRemoteStuff/ItemController.js"


function App(){
 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Products" element={<Products />} />      
     </Routes>
     <ProductCard product={new ItemController().getItem(0)}/>

   </>
 );
}


export default App;
