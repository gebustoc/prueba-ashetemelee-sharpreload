import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import NavBar from './components/organisms/Navbar.jsx';
import Contacto from './pages/Contacto.jsx';
import Footer from './components/organisms/Footer.jsx';
import ProductInfo from '../pages/ProductInfo.jsx';

function App(){
 return (
   <>
     <NavBar/>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Products" element={<Products />} />
    </Routes>
   </>
 );
}

export default App;
