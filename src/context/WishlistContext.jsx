import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { authUser } = useAuth();

  const fetchWishlist = async () => {
    if (!authUser?.id) {
      setWishlist([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/wishlist?userId=${authUser.id}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setWishlist([]);
    }
  };

  const addToWishlist = async (product) => {
    if (!authUser?.id) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      const exist = wishlist.find((item) => item.id === product.id);
      if (!exist) {
        await axios.post("http://localhost:3000/wishlist", {
          ...product,
          userId: authUser.id
        });
        toast.success("💖 Item added to wishlist");
      } else {
        // Find the wishlist item by both id and userId
        const wishlistRes = await axios.get(`http://localhost:3000/wishlist?id=${product.id}&userId=${authUser.id}`);
        const wishlistItem = wishlistRes.data[0];
        
        if (wishlistItem) {
          await axios.delete(`http://localhost:3000/wishlist/${wishlistItem.id}`);
          toast.info("🗑️ Item removed from wishlist");
        }
      }
      fetchWishlist();
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("Something went wrong");
    }
  };

  const removeFromWishlist = async (id) => {
    if (!authUser?.id) return;

    try {
      const wishlistRes = await axios.get(`http://localhost:3000/wishlist?id=${id}&userId=${authUser.id}`);
      const wishlistItem = wishlistRes.data[0];
      
      if (wishlistItem) {
        await axios.delete(`http://localhost:3000/wishlist/${wishlistItem.id}`);
        toast.info("🗑️ Item removed from wishlist");
        fetchWishlist();
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [authUser]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};