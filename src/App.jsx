import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar.jsx';
import Footer from './components/organisms/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductInfo from './pages/ProductInfo.jsx'
import Contacto from './pages/Contacto.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Blog from './pages/Blog.jsx';  
import NewsPage from './pages/NewsPage.jsx'
import NewsPage2 from './pages/NewsPage2.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NewsTransition from './pages/NewsTransition.jsx';
import Carrito from './pages/Carrito.jsx';


function App(){

// usualmente no veo que en las url usen mayusculas para ser honesto
 return (
   <>
     <NavBar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/products" element={<Products />} />
       <Route path="/product/:id" element={<ProductInfo />} />
       <Route path="/product/:id" element={<ProductInfo />} />
       <Route path="/contact" element={<Contacto/>} />
       <Route path="us" element={<Nosotros/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="register" element={<Register/>}/>
       <Route path="/blog" element={<Blog/>}/>
       <Route path="/news/" element={<NewsPage/>}/>
       <Route path="/news/:id" element={<NewsTransition/>}/>       
       <Route path="/login" element={<Login/>}/>
       <Route path="/cart" element={<Carrito/>}/>

    </Routes>
    <Footer/>
   </>
 );
}

export default App;
