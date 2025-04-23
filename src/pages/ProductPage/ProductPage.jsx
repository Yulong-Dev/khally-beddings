import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Productcard/ProductCard.jsx";
import aProduct from "../../components/Products/allProducts.js";
import "./ProductPage.css";
import { useCart } from "../../Context/CartContext.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { db } from "../../Context/firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const ProductPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const product = aProduct?.find((item) => item.id === parseInt(id));

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [productRatings, setProductRatings] = useState({}); // For recommended ratings

  const fetchFeedback = async () => {
    if (!product) return;

    const q = query(
      collection(db, "feedbacks"),
      where("productId", "==", product.id),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    const fbList = querySnapshot.docs.map((doc) => doc.data());
    setFeedbacks(fbList);
  };

  const fetchRecommendedRatings = async () => {
    const ratings = {};
    const recommendedIds = recommended.map((item) => item.id);

    for (let pid of recommendedIds) {
      const q = query(collection(db, "feedbacks"), where("productId", "==", pid));
      const querySnapshot = await getDocs(q);
      const feedbacks = querySnapshot.docs.map((doc) => doc.data());

      const avg =
        feedbacks.length > 0
          ? feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length
          : 0;

      ratings[pid] = avg;
    }

    setProductRatings(ratings);
  };

  useEffect(() => {
    fetchFeedback();
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;

    await addDoc(collection(db, "feedbacks"), {
      productId: product.id,
      productName: product.name,
      rating,
      comment,
      timestamp: new Date(),
    });

    setRating(0);
    setComment("");
    fetchFeedback();
  };

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length
      : 0;

  if (!product) return <div>Product not found</div>;

  const recommended = [...aProduct]
    .filter((item) => item.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  useEffect(() => {
    fetchRecommendedRatings();
  }, [product]);

  return (
    <div className="product-page-container">
      <Navbar />
      <div className="product-page">
        <div className="main-product">
          <div className="image-container">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ color: "gold", fontSize: "22px" }}>
                {Array.from({ length: 5 }).map((_, i) =>
                i < Math.round(averageRating) ? "★" : "☆"
                )}
              </div>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
               {averageRating.toFixed(1)}
              </span>
            </div>

            <p>₦{product.price}</p>
            <p>{product.description}</p>
            <button className="butter" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>

          {/* 🔥 FEEDBACK SECTION */}
          <div className="feedback-section">
            <h3>Customer Reviews</h3>

            <form onSubmit={handleSubmit} className="feedback-form">
              <label>Rate this product:</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: "pointer",
                      color: star <= rating ? "gold" : "#ccc",
                      fontSize: "20px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              ></textarea>
              <button className="butter" type="submit">
                Submit Review
              </button>
            </form>

            <div className="feedback-list">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, i) => (
                  <div key={i} className="feedback-item">
                    <div style={{ color: "gold" }}>
                      {"★".repeat(fb.rating)}
                      {"☆".repeat(5 - fb.rating)}
                    </div>
                    <p>{fb.comment}</p>
                    <small>
                      {new Date(fb.timestamp.seconds * 1000).toLocaleDateString()}
                    </small>
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to leave one!</p>
              )}
            </div>
          </div>
        </div>

        {/* 🔥 RECOMMENDED PRODUCTS */}
        <div className="recommended">
          <h3>Recommended Products</h3>
          {recommended.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              rating={productRatings[item.id] || 0}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
