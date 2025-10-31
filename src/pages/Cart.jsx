import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate loading for smoother UX
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [cartItems]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
        <div className="flex gap-3 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-gray-700 text-xl font-medium">Loading your cart...</p>
      </div>
    );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-4">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🛒</div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Start adding some delicious treats to your cart!
          </p>
          <button
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-pink-500/50 hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item?.product_details?.price || 0);
    const qty = Number(item?.quantity || 0);
    return sum + price * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-6 py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
            Your Cart
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-lg">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Cart Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cartItems.map((item, index) => {
            const product = item.product_details || {};
            const price = Number(product.price || 0);
            const qty = Number(item.quantity || 1);

            return (
              <div
                key={item.id || index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:scale-105 transition-all duration-500 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={product.image || "/assets/default.jpg"}
                      alt={product.name || "Product"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-300">
                      {product.name || "Unnamed Product"}
                    </h3>

                    <p className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
                      ₹{price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-4 mb-4 mt-auto">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 w-10 h-10 rounded-full text-xl font-bold hover:from-pink-200 hover:to-rose-200 hover:scale-110 transition-all duration-300 shadow-md flex items-center justify-center"
                      >
                        −
                      </button>

                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-2 rounded-full border-2 border-pink-200">
                        <span className="text-xl font-bold text-gray-800">
                          {qty}
                        </span>
                      </div>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 w-10 h-10 rounded-full text-xl font-bold hover:from-pink-200 hover:to-rose-200 hover:scale-110 transition-all duration-300 shadow-md flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-center mb-4 text-sm text-gray-600">
                      Subtotal:{" "}
                      <span className="font-bold text-gray-800">
                        ₹{(price * qty).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-full bg-gradient-to-r from-red-50 to-pink-50 text-red-600 px-4 py-3 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all duration-300 font-semibold border-2 border-red-200 hover:border-red-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <svg
                        className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total and Checkout Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Summary */}
            <div className="flex justify-between items-center text-lg text-gray-600">
              <span>Items ({cartItems.length})</span>
              <span className="font-semibold">
                ₹
                {cartItems
                  .reduce(
                    (sum, item) =>
                      sum +
                      Number(item?.product_details?.price || 0) *
                        Number(item?.quantity || 0),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            <div className="border-t-2 border-pink-200 pt-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-gray-800">Total</span>
                <span className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl shadow-green-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                onClick={() => navigate("/checkout")}
              >
                <span>Proceed to Checkout</span>
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button
                className="w-full mt-4 text-pink-600 hover:text-pink-700 font-semibold py-3 transition-colors duration-300"
                onClick={() => navigate("/menu")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
