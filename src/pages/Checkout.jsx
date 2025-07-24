import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const [address, setAddress] = useState({
    fullName: authUser?.name || "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!authUser?.id) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    const { fullName, phone, address1, city, pincode, state } = address;
    if (!fullName || !phone || !address1 || !city || !pincode || !state) {
      toast.error("Please fill all required address fields.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      total: totalAmount,
      date: new Date().toLocaleString(),
      status: "Processing",
      userId: authUser.id,
      userEmail: authUser.email,
      user: {
        name: fullName,
        email: authUser.email,
        phone,
        address,
      },
    };

    try {
      await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      await clearCart();
      toast.success("🎉 Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("❌ Failed to place order.");
      console.error("Order error:", err);
    }
  };

  if (!authUser) {
    return (
      <div className="min-h-screen bg-pink-50 px-4 py-10 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to proceed with checkout</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-pink-50 px-4 py-10 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checkout</p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          🧾 Checkout
        </h2>

        {/* Products List */}
        <div className="mb-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">Brand: {item.brand || "N/A"}</p>
                <p className="text-gray-700">Qty: {item.quantity}</p>
              </div>
              <p className="ml-auto text-orange-600 font-semibold">
                ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Address Form */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="address1"
            value={address.address1}
            onChange={handleChange}
            placeholder="Address Line 1"
            className="border rounded p-2 col-span-1 sm:col-span-2"
          />
          <input
            type="text"
            name="address2"
            value={address.address2}
            onChange={handleChange}
            placeholder="Address Line 2 (optional)"
            className="border rounded p-2 col-span-1 sm:col-span-2"
          />
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="State"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border rounded p-2"
          />
        </div>

        {/* Total and Button */}
        <div className="mt-8 border-t pt-4">
          <p className="text-xl font-bold text-gray-800 mb-4">
            Total: ₹{totalAmount.toFixed(2)}
          </p>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-lg transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;