import { createContext, useContext, useState, useCallback } from "react";
import { generatePrice } from "./price";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((game) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === game.id)) return prev;
      return [...prev, { ...game, price: generatePrice(game.id) }];
    });
  }, []);

  const removeFromCart = useCallback((gameId) => {
    setItems((prev) => prev.filter((item) => item.id !== gameId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (gameId) => items.some((item) => item.id === gameId),
    [items]
  );

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, isInCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
