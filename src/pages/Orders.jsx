import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authUser?.id) {
        setOrders([]);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/orders?userId=${authUser.id}`);
        const data = await res.json();
        // Sort orders by date (newest first)
        const sortedOrders = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [authUser]);

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">
        📦 Your Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">You have no orders yet.</p>
          {!authUser && (
            <p className="text-gray-500">Please login to view your orders.</p>
          )}
        </div>
      ) : (
        <div className="space-y-8 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="mb-4">
                <p className="text-gray-500">Order ID: #{order.id}</p>
                <p className="text-gray-500">Order Date: {order.date}</p>
                <p className="text-gray-700 font-semibold">
                  Status: <span className={`${
                    order.status === 'Delivered' ? 'text-green-600' : 
                    order.status === 'Processing' ? 'text-blue-600' : 
                    'text-pink-600'
                  }`}>{order.status}</span>
                </p>
                <p className="text-gray-800 font-semibold mt-2">
                  Total: ₹{order.total.toFixed(2)}
                </p>
              </div>

              {/* User Details */}
              {order.user && (
                <div className="bg-pink-100 p-4 rounded-md mb-4 text-sm text-gray-800">
                  <h4 className="font-semibold mb-2">Delivery Details:</h4>
                  <p><strong>Name:</strong> {order.user.name}</p>
                  <p><strong>Phone:</strong> {order.user.phone}</p>
                  <p><strong>Address:</strong> {order.user.address?.address1}, {order.user.address?.address2}</p>
                  <p>
                    {order.user.address?.city}, {order.user.address?.state} - {order.user.address?.pincode}
                  </p>
                </div>
              )}

              {/* Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600">Brand: {item.brand || "N/A"}</p>
                      <p className="text-pink-600 font-bold mt-1">₹{item.price}</p>
                      <p className="text-sm text-gray-700">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-700 font-semibold">
                        Subtotal: ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;