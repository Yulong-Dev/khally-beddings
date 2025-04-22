import React from "react";
import ProductCard from "../Productcard/ProductCard"; // Adjust path based on your structure
import "./ProductTease.css";
import allProducts from "./allProducts.js";

const ProductTease = () => {
    const featuredProducts = allProducts.filter((p) =>
        [1, 4, 6, 7, 10].includes(p.id)
      );

  return (
    <div className="product-tease">
      <h3 className="tease-title">Featured Picks</h3>
      <div className="tease-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductTease;
