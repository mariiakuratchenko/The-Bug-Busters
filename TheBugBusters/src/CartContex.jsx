// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

/**
 * Global cart state for The Bug Busters.
 * Stores items in localStorage so the cart persists between refreshes.
 */
const CartContext = createContext();

const STORAGE_KEY = "bugbusters_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    // Initial state from localStorage with defensive try/catch
    try {
      if (typeof window === "undefined") return [];
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // silently fail if storage is not available
    }
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);

      if (existing) {
        return prev.map((it) =>
          it.id === product.id
            ? { ...it, quantity: it.quantity + quantity }
            : it
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, quantity: Math.max(1, quantity) } : it
        )
        .filter((it) => it.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);
  const totalPrice = items.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
