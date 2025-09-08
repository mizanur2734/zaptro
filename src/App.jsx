import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Navbar from "./Components/Navbar";
import axios from "axios";
// import Footer from "./components/Footer";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const App = () => {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)

  const getLocation = async ()=>{
    navigator.geolocation.getCurrentPosition(async post => {
      const {latitude, longitude} = post.coords
      // console.log(latitude, longitude)

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await axios.get(url);
      const exactLocation = response.data.address
      setLocation(exactLocation)
      setOpenDropdown(false)
      // console.log(exactLocation)
    } catch (error) {
      console.error("Error fetching location:", error);
    }
   })
  }
  useEffect(() =>{
      getLocation()
    },[])
  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} 
      setOpenDropdown={setOpenDropdown}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
};

export default App;
