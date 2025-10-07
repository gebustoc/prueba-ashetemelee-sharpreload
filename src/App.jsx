import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/home';
import Products from './pages/products';
import ".ShittyRemoteStuff/ItemController.js"

function App() {
  new ItemController();

 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Products" element={<Products />} />
     </Routes>
   </>
 );
}


export default App;
