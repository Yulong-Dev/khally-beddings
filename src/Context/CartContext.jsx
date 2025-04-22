import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./Authentication/AuthContext";
import { db } from "./firebase"; 
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const guestCartKey = "guest-cart";
  const [cartItems, setCartItems] = useState([]);

  const mergeCarts = (cartA, cartB) => {
    const merged = [...cartA];
    cartB.forEach((itemB) => {
      const index = merged.findIndex((itemA) => itemA.id === itemB.id);
      if (index !== -1) {
        merged[index].quantity += itemB.quantity;
      } else {
        merged.push(itemB);
      }
    });
    return merged;
  };

  const fetchCart = async () => {
    if (!currentUser) {
      // 👤 Guest user
      const guestCart = JSON.parse(localStorage.getItem(guestCartKey)) || [];
      setCartItems(guestCart);
    } else {
      // 👥 Logged-in user
      const cartRef = doc(db, "carts", currentUser.uid);
      const docSnap = await getDoc(cartRef);
      const userCart = docSnap.exists() ? docSnap.data().items || [] : [];

      const guestCart = JSON.parse(localStorage.getItem(guestCartKey)) || [];
      const mergedCart = mergeCarts(userCart, guestCart);

      // Save merged to Firestore
      await setDoc(cartRef, { items: mergedCart });
      localStorage.removeItem(guestCartKey);
      setCartItems(mergedCart);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [currentUser]);

  const saveCart = async (items) => {
    setCartItems(items);
    if (currentUser) {
      const cartRef = doc(db, "carts", currentUser.uid);
      await setDoc(cartRef, { items });
    } else {
      localStorage.setItem(guestCartKey, JSON.stringify(items));
    }
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const updated = existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
      saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    saveCart(updated);
  };

  const updateQuantity = (productId, quantity) => {
    const updated = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    if (currentUser) {
      const cartRef = doc(db, "carts", currentUser.uid);
      setDoc(cartRef, { items: [] });
    } else {
      localStorage.removeItem(guestCartKey);
    }
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getItemCount,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
