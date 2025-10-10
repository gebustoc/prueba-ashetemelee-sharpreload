import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar.jsx';
import Footer from './components/organisms/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductInfo from './pages/ProductInfo.jsx'
import Contacto from './pages/Contacto.jsx'
import Nosotros from './pages/Nosotros.jsx'


function App(){

 return (
   <>
     <NavBar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/Products" element={<Products />} />
       <Route path="/Product/:id" element={<ProductInfo />} />
       <Route path="/Product/:id" element={<ProductInfo />} />
       <Route path="/Contacto" element={<Contacto/>} />
       <Route path="us" element={<Nosotros/>}/>

    </Routes>
    <Footer/>
   </>
 );
}

export default App;
