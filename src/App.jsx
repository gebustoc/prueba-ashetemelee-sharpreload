import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import NavBar from './components/organisms/Navbar.jsx';
import Contacto from './pages/Contacto.jsx';
import ProductCard from "./components/organisms/ProductCard.jsx"
import ItemController from "./ShittyRemoteStuff/ItemController.js"
import Footer from './components/organisms/Footer.jsx';

function App(){
 return (
   <>
     <NavBar/>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Products" element={<Products />} />
       <Route path="/Contacto" element={<Contacto />} />
     </Routes>
   </>
 );
//<Footer/>
}

export default App;
