import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar.js';
import Home from '../pages/home.jsx';
import Products from '../pages/products.jsx';


function App(){
 return (
   <>
     <NavBar />
     <Routes>
       <ProductCard>
       <Route path="/" element={<Home />} />
       <Route path="/Products" element={<Products />} />
      
     </Routes>
   </>
 );
}


export default App;
