import { BrowserRouter ,Route,Routes} from "react-router-dom";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";

import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./pages/cart/Cart";
import AddProduct from "./components/addproduct/AddProduct";

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reset" element={<Reset/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/sellproduct" element={<AddProduct/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
