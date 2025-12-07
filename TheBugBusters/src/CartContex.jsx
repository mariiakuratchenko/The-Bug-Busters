// src/context/CartContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Global cart state for The Bug Busters.
 * - Keeps cart items in React Context
 * - Persists data to localStorage
 */
const CartContext = createContext(null);

const STORAGE_KEY = "bugbusters_cart";

/**
 * Safely read cart items from localStorage.
 */
function readCartFromStorage() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Safely write cart items to localStorage.
 */
function writeCartToStorage(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage hatası (private mode, quota vs.) sessizce geç
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCartFromStorage());

  // Her değişimde localStorage'a yaz
  useEffect(() => {
    writeCartToStorage(items);
  }, [items]);

  /**
   * Ürün ekle:
   * - Varsa miktarını artırır
   * - Yoksa yeni entry ekler
   */
  const addItem = useCallback((product, quantity = 1) => {
    const safeQty = Number.isFinite(quantity) ? Math.max(1, quantity) : 1;

    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);

      if (existing) {
        return prev.map((it) =>
          it.id === product.id
            ? { ...it, quantity: it.quantity + safeQty }
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
          quantity: safeQty,
        },
      ];
    });
  }, []);

  /**
   * Miktar güncelle:
   * - quantity <= 0 ise ürünü tamamen siler
   * - aksi takdirde min 1 olarak set eder
   */
  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) => {
      const safeQty = Number.isFinite(quantity) ? quantity : 1;

      if (safeQty <= 0) {
        return prev.filter((it) => it.id !== id);
      }

      return prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, safeQty) } : it
      );
    });
  }, []);

  /**
   * Ürünü tamamen sepetten sil.
   */
  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  /**
   * Tüm sepeti temizle.
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * Türemiş değerler: toplam ürün adedi ve toplam fiyat
   */
  const { totalItems, totalPrice } = useMemo(() => {
    const totalItemsCalc = items.reduce(
      (sum, it) => sum + (it.quantity || 0),
      0
    );

    const totalPriceCalc = items.reduce(
      (sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 0),
      0
    );

    return {
      totalItems: totalItemsCalc,
      totalPrice: totalPriceCalc,
    };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, addItem, updateQuantity, removeItem, clearCart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
