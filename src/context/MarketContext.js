import { createContext, useContext } from "react";
import { products } from "../data/market";
import { usePersistentState } from "../hooks/usePersistentState";

// Shopping cart: [{ id, quantity }]
const MarketContext = createContext(null);

export const MarketProvider = ({ children }) => {
  const [cart, setCart] = usePersistentState("cart", []);

  const addToCart = (id) => {
    setCart((prev) =>
      prev.some((item) => item.id === id)
        ? prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...prev, { id, quantity: 1 }]
    );
  };

  const setQuantity = (id, quantity) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  // Skip items whose product disappeared from the catalog
  const items = cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((item) => item.product);

  const value = {
    products,
    getProduct: (id) => products.find((product) => product.id === id),
    cartItems: items,
    cartCount: items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
    isInCart: (id) => items.some((item) => item.id === id),
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
};

export const useMarket = () => useContext(MarketContext);
