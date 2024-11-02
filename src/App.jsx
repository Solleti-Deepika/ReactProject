import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css'
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import Home from "./Home";
import NonVeg from "./NonVeg";
import PurchaseHistory from "./PurchaseHistory";
import Veg from "./Veg";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginComponent from "./GoogleLoginComponent";


function App()
{
  const cartItems = useSelector((state) => state.cart  || []);
  const totalItems = cartItems.reduce((sum,item) => sum + item.quantity,0);
  return(
    <>
    <GoogleOAuthProvider clientId="915858392010-7vsjn1q8blgug8dcm569i8fp9l1092av.apps.googleusercontent.com">
      <GoogleLoginComponent/>
    </GoogleOAuthProvider>
   <BrowserRouter>

      <Link to='/home'>Home</Link>
      <Link to='/veg'>veg</Link>
      <Link to='/non-veg'>Non-veg</Link>
      <Link to='/cart'>Cart({totalItems})</Link>
      <Link to='/purchasehistory'>PurchaseHistory</Link>
      <Link to='/aboutus'>AboutUs</Link>
      <Link to='/contactus'>ContactUs</Link>


      <Routes>

        <Route path='/home' element={<Home/>}/>
        <Route path='/veg' element={<Veg/>}/>
        <Route path='/non-veg' element={<NonVeg/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/purchasehistory' element={<PurchaseHistory/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        
      </Routes>
   </BrowserRouter>
    </>
  )
}
export default App;