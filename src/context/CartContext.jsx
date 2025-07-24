import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { authUser } = useAuth();

  const fetchCart = async () => {
    if (!authUser?.id) {
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/cart?userId=${authUser.id}`);
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    }
  };

  const addToCart = async (product) => {
    if (!authUser?.id) {
      toast.error("Please login to add items to cart");
      return;
    }

    const exist = cartItems?.find((item) => item?.id === product?.id);

    if (!exist) {
      try {
        await axios.post("http://localhost:3000/cart", { 
          ...product, 
          quantity: 1,
          userId: authUser.id
        });
        fetchCart();
        toast.success(`${product.name} added to cart!`);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    } else {
      toast.info(
        ({ closeToast }) => (
          <div>
            <p>{product.name} is already in cart.</p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={async () => {
                  await increaseQty(product.id);
                  toast.success(`Increased quantity of ${product.name}`);
                  closeToast();
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Add Again
              </button>
              <button
                onClick={closeToast}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ),
        { autoClose: false }
      );
    }
  };

  const increaseQty = async (id) => {
    if (!authUser?.id) return;

    const item = cartItems.find((item) => item.id === id);
    if (item) {
      try {
        // Find the cart item by both id and userId
        const cartRes = await axios.get(`http://localhost:3000/cart?id=${id}&userId=${authUser.id}`);
        const cartItem = cartRes.data[0];
        
        if (cartItem) {
          await axios.patch(`http://localhost:3000/cart/${cartItem.id}`, {
            quantity: item.quantity + 1,
          });
          fetchCart();
        }
      } catch (error) {
        console.error("Error increasing quantity:", error);
        toast.error("Failed to update quantity");
      }
    }
  };

  const decreaseQty = async (id) => {
    if (!authUser?.id) return;

    const item = cartItems.find((item) => item.id === id);
    if (item) {
      try {
        const cartRes = await axios.get(`http://localhost:3000/cart?id=${id}&userId=${authUser.id}`);
        const cartItem = cartRes.data[0];
        
        if (cartItem) {
          if (item.quantity > 1) {
            await axios.patch(`http://localhost:3000/cart/${cartItem.id}`, {
              quantity: item.quantity - 1,
            });
          } else {
            await axios.delete(`http://localhost:3000/cart/${cartItem.id}`);
          }
          fetchCart();
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
        toast.error("Failed to update quantity");
      }
    }
  };

  const removeFromCart = async (id) => {
    if (!authUser?.id) return;

    try {
      const cartRes = await axios.get(`http://localhost:3000/cart?id=${id}&userId=${authUser.id}`);
      const cartItem = cartRes.data[0];
      
      if (cartItem) {
        await axios.delete(`http://localhost:3000/cart/${cartItem.id}`);
        fetchCart();
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    if (!authUser?.id) return;

    try {
      // Get all cart items for this user
      const userCartItems = await axios.get(`http://localhost:3000/cart?userId=${authUser.id}`);
      
      // Delete each item
      const deletePromises = userCartItems.data.map(item => 
        axios.delete(`http://localhost:3000/cart/${item.id}`)
      );
      
      await Promise.all(deletePromises);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [authUser]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      increaseQty, 
      decreaseQty, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};