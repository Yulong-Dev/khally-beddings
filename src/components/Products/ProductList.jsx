import React from "react";
import "../Products/ProductList.css"; 
import ProductCard from "../Productcard/ProductCard";
import { useCart } from "../../Context/CartContext.jsx";
import { useSearch } from "../../Context/SearchContext.jsx";
import  aProducts  from "./allProducts.js"; // Assuming allProducts is an array of product objects

const ProductList = () => {
  const { searchTerm } = useSearch();
  const { addToCart } = useCart();

  


  const filteredProducts = aProducts.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard 
          key={product.id} 
          product={product} 
          addToCart={addToCart} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};


export default ProductList;
