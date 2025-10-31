import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/orders/");
      const sorted = [...res.data].sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sorted);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await API.patch(`/admin/orders/${id}/status/`, { status: newStatus });
      setOrders(prev =>
        prev.map(order => (order.id === id ? { ...order, status: newStatus } : order))
      );
      toast.success(`✅ Order #${id} marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Could not update order status.");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await API.delete(`/admin/orders/${id}/`);
      setOrders(prev => prev.filter(order => order.id !== id));
      toast.success("🗑️ Order deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Failed to delete order.");
    }
  };

  const statusColor = {
    delivered: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (loading)
    return <div className="flex justify-center items-center h-[80vh] text-lg">Loading orders...</div>;

  if (!orders.length)
    return <div className="flex justify-center items-center h-[80vh] text-gray-600 text-lg">No orders found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-700 mb-6">📦 Manage Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  Customer Email: {order.email || "N/A"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">
                  ₹{Number(order.total || 0).toFixed(2)}
                </p>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    statusColor[order.status?.toLowerCase()] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <img
                    src={item.product_details?.image}
                    alt={item.product_details?.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p className="font-medium truncate">{item.product_details?.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-green-600">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="border px-3 py-1 rounded text-sm focus:ring focus:ring-pink-200"
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                {expandedOrder === order.id ? "Hide Details" : "Show Details"}
              </button>

              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>

            {/* Expanded Order Summary */}
            {expandedOrder === order.id && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <p>Total Items: {order.items.length}</p>
                <p>Status: {order.status}</p>
                <p>Total: ₹{Number(order.total || 0).toFixed(2)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
