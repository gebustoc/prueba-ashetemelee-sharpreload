import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Products from '../pages/products.jsx';
import NavBar from './components/organisms/Navbar.jsx';
import Footer from './components/organisms/Footer.jsx';
import ProductInfo from '../pages/ProductInfo.jsx';


function App(){
 return (
   <>
    <NavBar/>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Products" element={<Products />} />
       <Route path="/Product/:id" element={<ProductInfo/>}/>
    </Routes>
    <Footer/>
   </>
 );
}


export default App;
