import React from "react";
import { useCart } from "../../Context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product, rating = 0 }) => {
  const { addToCart } = useCart();

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>★</span>)}
        {hasHalf && <span key="half">☆</span>}
        {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`}>☆</span>)}
      </>
    );
  };

  return (
    <div className="product-card">
      <a href={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} style={{ width: "100%" }} />
      </a>
      <h3>
        <a href={`/product/${product.id}`} style={{ textDecoration: "none", color: "#111" }}>
          {product.name}
        </a>
      </h3>

      <div className="product-rating" style={{ color: "gold" }}>
        {renderStars()}
        {rating > 0 && (
          <span style={{ marginLeft: "6px", color: "#555", fontSize: "14px" }}>
            ({rating.toFixed(1)})
          </span>
        )}
      </div>

      <p>₦{product.price.toLocaleString()}</p>
      <button className="butter" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
