import React from "react";
import ProductCard from "../Productcard/ProductCard"; // Adjust path based on your structure
import "./ProductTease.css";
import allProducts from "./allProducts.js";
import { motion } from "framer-motion";

const ProductTease = () => {
    const featuredProducts = allProducts.filter((p) =>
        [1, 4, 6, 7, 10].includes(p.id)
      );

  return (
    <div className="product-tease">
      <motion.div
          className="product-tease"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
      <h3 className="tease-title">Featured Picks</h3>
      <div className="tease-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      </motion.div>
    </div>
  );
};

export default ProductTease;
