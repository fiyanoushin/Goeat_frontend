import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import API from "../api";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: authUser?.name || "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.product_details.price) * item.quantity,
    0
  );

  // 🧩 Load Razorpay script dynamically (safe for Vercel)
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector("#razorpay-script")) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (loading) return; // prevent double clicks

    if (!authUser) {
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

    setLoading(true);

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item.product_details?.id || item.product?.id || item.id,
          quantity: item.quantity,
        })),
        total: totalAmount,
        address,
      };

      // 1️⃣ Create order in backend
      const res = await API.post("orders/create/", orderPayload);
      const data = res.data;

      if (!data?.razorpay_order_id) {
        toast.error("Backend did not return a valid Razorpay order ID");
        setLoading(false);
        return;
      }

      // 2️⃣ Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load Razorpay. Try again.");
        setLoading(false);
        return;
      }

      // 3️⃣ Razorpay checkout options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_RX3p5au36kGfhF", // ✅ test key
        amount: data.amount,
        currency: data.currency,
        name: "Dessert Shop",
        description: "Order Payment",
        order_id: data.razorpay_order_id,
        handler: async (response) => {
          try {
            const verifyRes = await API.post("orders/verify-payment/", {
              order_id: data.order_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.status === 200) {
              clearCart();
              toast.success("🎉 Payment successful! Order placed.");
              navigate("/orders");
            } else {
              toast.error("❌ Payment verification failed.");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.error("❌ Payment verification failed.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: fullName,
          email: authUser.email,
          contact: phone,
        },
        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        console.warn("Payment failed:", resp.error);
        toast.error("❌ Payment failed or cancelled.");
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Place order error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else {
        toast.error(err.response?.data?.error || "Failed to place order");
      }

      setLoading(false);
    }
  };

  // ⚠️ Guard UI (login + cart checks)
  if (!authUser) {
    return (
      <div className="min-h-screen bg-pink-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Login</h2>
          <p className="text-gray-600 mb-6">Login to continue with checkout.</p>
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
      <div className="min-h-screen bg-pink-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some items before checkout.</p>
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

  // 🧾 Main checkout form
  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          🧾 Checkout
        </h2>

        {/* Products list */}
        <div className="mb-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded-xl shadow-sm"
            >
              <img
                src={item.product_details.image}
                alt={item.product_details.name}
                className="h-20 w-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {item.product_details.name}
                </h3>
                <p className="text-gray-500">
                  Brand: {item.product_details.brand || "N/A"}
                </p>
                <p className="text-gray-700">Qty: {item.quantity}</p>
              </div>
              <p className="ml-auto text-orange-600 font-semibold">
                ₹
                {(
                  parseFloat(item.product_details.price) * item.quantity
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Address Form */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Shipping Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "fullName",
            "phone",
            "address1",
            "address2",
            "city",
            "state",
            "pincode",
          ].map((field, i) => (
            <input
              key={i}
              type="text"
              name={field}
              value={address[field]}
              onChange={handleChange}
              placeholder={
                field === "address2"
                  ? "Address Line 2 (optional)"
                  : field.replace(/([A-Z])/g, " $1").trim()
              }
              className="border rounded p-2"
            />
          ))}
        </div>

        {/* Total & Pay */}
        <div className="mt-8 border-t pt-4">
          <p className="text-xl font-bold text-gray-800 mb-4">
            Total: ₹{totalAmount.toFixed(2)}
          </p>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-xl text-white transition ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Processing..." : "Place Order & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
