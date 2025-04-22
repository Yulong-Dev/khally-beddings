import React from "react";
import Navbar from "./../Navbar/Navbar";
import ProductList from "./../Products/ProductList";
import Footer from "../Footer/Footer";
import "./Shop.css";

const Shop = () => {
  return (
    <div className="shop-container">
        <Navbar />
      
    <div className="shop-page">
      <div className="shop-header">
        <h2>Our Products</h2>
        <p>Browse all our high-quality beddings, pillows, towels and more.</p>
      </div>
      <ProductList />
      
    </div>
    <Footer />
    </div>
  );
};

export default Shop;
