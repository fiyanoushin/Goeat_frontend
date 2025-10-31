// src/context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // ---------------------
  // Fetch wishlist
  // ---------------------
  const fetchWishlist = async () => {
    if (!authUser) {
      setWishlist([]);
      return;
    }

    try {
      const res = await API.get("wishlist/");
      setWishlist(res.data || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        window.dispatchEvent(new CustomEvent("userLogout"));
      }
      setWishlist([]);
    }
  };

  // ---------------------
  // Add / Remove Wishlist (toggle)
  // ---------------------
  const addToWishlist = async (product) => {
    if (!authUser) {
      toast.error("Please login to manage wishlist");
      return;
    }

    // handle both possible response structures
    const existing = wishlist.find(
      (item) =>
        item.product?.id === product.id ||
        item.product_details?.id === product.id ||
        item.product === product.id
    );

    try {
      if (!existing) {
        // Optimistic update
        setWishlist((prev) => [...prev, { product: product.id, product_details: product }]);
        await API.post("wishlist/", { product: product.id });
        toast.success("💖 Added to wishlist");
      } else {
        // Optimistic removal
        setWishlist((prev) =>
          prev.filter(
            (i) =>
              i.product !== product.id &&
              i.product_details?.id !== product.id &&
              i.product?.id !== product.id
          )
        );
        await API.delete("wishlist/", { data: { product: product.id } });
        toast.info("🗑️ Removed from wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        window.dispatchEvent(new CustomEvent("userLogout"));
      } else {
        toast.error("Failed to update wishlist");
      }
      // fallback: refetch to sync with backend in case of mismatch
      fetchWishlist();
    }
  };

  // ---------------------
  // Remove specific product
  // ---------------------
  const removeFromWishlist = async (productId) => {
    try {
      await API.delete("wishlist/", { data: { product: productId } });
      setWishlist((prev) =>
        prev.filter(
          (i) =>
            i.product !== productId &&
            i.product_details?.id !== productId &&
            i.product?.id !== productId
        )
      );
      toast.info("🗑️ Item removed from wishlist");
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
      toast.error("Failed to remove item");
    }
  };

  // ---------------------
  // Clear on logout
  // ---------------------
  useEffect(() => {
    const handleLogout = () => setWishlist([]);
    window.addEventListener("userLogout", handleLogout);
    return () => window.removeEventListener("userLogout", handleLogout);
  }, []);

  // ---------------------
  // Fetch when user logs in
  // ---------------------
  useEffect(() => {
    fetchWishlist();
  }, [authUser]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
