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

function App(){

 return (
   <>
     <NavBar/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/Products" element={<Products />}/>
       <Route path="/Product/:id" element={<ProductInfo/>}/>
       <Route path="/products/Product/:id" element={<ProductInfo/>} />
       <Route path="/Contacto" element={<Contacto/>}/>
       <Route path="/us" element={<Nosotros/>}/>
       <Route path="/blog" element={<Blog/>}/>
       <Route path="/news" element={<NewsPage/>}/>
       <Route path="/news2" element={<NewsPage2/>}/>
       <Route path="/login" element={<Login/>}/>
    </Routes>
    <Footer/>
   </>
 );
}

export default App;
