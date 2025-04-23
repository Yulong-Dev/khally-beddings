import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { db } from "../../Context/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [rating, setRating] = useState(0);

  const fetchRating = async () => {
    const q = query(
      collection(db, "feedbacks"),
      where("productId", "==", product.id)
    );

    const querySnapshot = await getDocs(q);
    const feedbacks = querySnapshot.docs.map((doc) => doc.data());
    
    const average =
      feedbacks.length > 0
        ? feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length
        : 0;

    setRating(average);
  };

  useEffect(() => {
    fetchRating();
  }, [product.id]);

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
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} style={{ width: "100%" }} />
      </Link>
      <h3>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "#111" }}>
          {product.name}
        </Link>
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
