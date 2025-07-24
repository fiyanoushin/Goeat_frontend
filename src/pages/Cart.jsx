import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Your cart is empty. Start adding delicious treats!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-xl flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-pink-700 text-lg mb-2">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-auto">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-lg font-bold hover:bg-pink-200"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-lg font-bold hover:bg-pink-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="mt-10 flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Total: ₹{totalPrice.toFixed(2)}
            </p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-lg shadow-md"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
