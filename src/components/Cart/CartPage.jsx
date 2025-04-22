import React from "react";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/Authentication/AuthContext";

import "../Cart/CartPage.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { currentUser } = useAuth();

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId, 1);
    }
  };

  const handleIncrease = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderMessage = cartItems
      .map(
        (item) =>
          `${item.name} x${item.quantity} = ₦${item.price * item.quantity}`
      )
      .join("\n");

    const whatsappLink = `https://wa.me/2347026775267?text=${encodeURIComponent(
      "ORDER FROM KHALLY BEDDINGS:\n" +
        orderMessage +
        `\n\nTOTAL: ₦${total.toLocaleString()}`
    )}`;

    window.open(whatsappLink, "_blank");
    alert("Order in progress...");
    clearCart();
  };

  return (
    <div className="cart-page-container">
      <Navbar />

      <div className="cart-page">
        <h2>Your Cart</h2>

        {!currentUser && (
          <p className="guest-warning">
            Please Signup or Login for seamless usage. Your cart is saved on this device only.
          </p>
        )}

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      ₦{item.price.toLocaleString()} x {item.quantity}
                    </p>
                    <div className="quantity-controls">
                      <div>
                        <button
                          onClick={() => handleDecrease(item.id, item.quantity)}
                        >
                          -
                        </button>
                      </div>
                      <div>{item.quantity}</div>
                      <div>
                        <button
                          onClick={() => handleIncrease(item.id, item.quantity)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <h3>Total: ₦{total.toLocaleString()}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout via WhatsApp
              </button>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
