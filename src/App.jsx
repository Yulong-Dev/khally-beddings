import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import CartPage from "./components/Cart/CartPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Shop from "./components/Shop/Shop.jsx";
import Aboutus from "./pages/About/Aboutus.jsx";
import FAQ from "./pages/FAQ/FAQ.jsx";
import ForgotPassword from "./pages/ForgotP/ForgotPassword.jsx";
import { AuthProvider } from "./Context/Authentication/AuthContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";
import "./App.css";

function App() {

  return (
    <AuthProvider>
      <CartProvider>
       <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/faq" element={<FAQ />} />

          </Routes>
        </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
