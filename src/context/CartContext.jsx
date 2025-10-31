// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { authUser } = useAuth();

  // ---------------------
  // Fetch cart items
  // ---------------------
  const fetchCart = async () => {
    if (!authUser) {
      setCartItems([]);
      return;
    }

    try {
      const res = await API.get("cart/");
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        window.dispatchEvent(new CustomEvent("userLogout"));
      }
      setCartItems([]);
    }
  };

  // ---------------------
  // Add to cart
  // ---------------------
  const addToCart = async (product) => {
    if (!authUser) {
      toast.error("Please login to add items to cart");
      return;
    }

    const existingItem = cartItems.find(
      (item) =>
        item.product?.id === product.id ||
        item.product === product.id // handle both serialized and nested
    );

    try {
      if (!existingItem) {
        const res = await API.post("cart/", { product: product.id, quantity: 1 });
        setCartItems((prev) => [...prev, res.data]);
        toast.success(`${product.name} added to cart!`);
      } else {
        const updatedQty = existingItem.quantity + 1;
        await API.patch(`cart/${existingItem.id}/`, { quantity: updatedQty });

        setCartItems((prev) =>
          prev.map((i) =>
            i.id === existingItem.id ? { ...i, quantity: updatedQty } : i
          )
        );
        toast.success(`Increased quantity of ${product.name}`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        window.dispatchEvent(new CustomEvent("userLogout"));
      } else {
        toast.error("Failed to add item to cart");
      }
    }
  };

  // ---------------------
  // Remove from cart
  // ---------------------
  const removeFromCart = async (cartId) => {
    try {
      await API.delete(`cart/${cartId}/`);
      setCartItems((prev) => prev.filter((i) => i.id !== cartId));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
      toast.error("Failed to remove item");
    }
  };

  // ---------------------
  // Increase / Decrease quantity
  // ---------------------
  const updateQuantity = async (cartId, newQty) => {
    try {
      if (newQty < 1) return removeFromCart(cartId);

      await API.patch(`cart/${cartId}/`, { quantity: newQty });
      setCartItems((prev) =>
        prev.map((i) => (i.id === cartId ? { ...i, quantity: newQty } : i))
      );
    } catch (err) {
      console.error("Error updating quantity:", err.response?.data || err.message);
      toast.error("Failed to update quantity");
    }
  };

  const increaseQty = (cartId) => {
    const item = cartItems.find((i) => i.id === cartId);
    if (item) updateQuantity(cartId, item.quantity + 1);
  };

  const decreaseQty = (cartId) => {
    const item = cartItems.find((i) => i.id === cartId);
    if (item) updateQuantity(cartId, item.quantity - 1);
  };

  // ---------------------
  // Clear cart (local + backend)
  // ---------------------
  const clearCart = async () => {
    try {
      await API.delete("cart/clear/"); // assume backend supports this endpoint
    } catch (err) {
      console.warn("Backend clearCart not supported, clearing local only.");
    } finally {
      setCartItems([]);
      toast.success("Cart cleared after successful payment");
    }
  };

  // ---------------------
  // Clear cart on logout
  // ---------------------
  useEffect(() => {
    const handleLogout = () => {
      setCartItems([]);
    };
    window.addEventListener("userLogout", handleLogout);
    return () => window.removeEventListener("userLogout", handleLogout);
  }, []);

  // ---------------------
  // Fetch on login
  // ---------------------
  useEffect(() => {
    fetchCart();
  }, [authUser]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
