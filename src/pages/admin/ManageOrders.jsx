import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/orders");
      // Sort orders by date (newest first)
      const sortedOrders = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: newStatus
      });
      
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      ));
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📦 Order Management</h2>
        <div className="text-sm text-gray-600">
          Total Orders: {orders.length}
        </div>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                  <p className="text-sm text-gray-600">
                    Customer: {order.user?.name || 'N/A'} ({order.userEmail || order.user?.email || 'No email'})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    ₹{order.total.toFixed(2)}
                  </p>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Customer Details */}
              {order.user && order.user.address && (
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🚚 Delivery Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Name:</strong> {order.user.name}</p>
                      <p><strong>Phone:</strong> {order.user.phone}</p>
                      <p><strong>Email:</strong> {order.user.email}</p>
                    </div>
                    <div>
                      <p><strong>Address:</strong></p>
                      <p>{order.user.address.address1}</p>
                      {order.user.address.address2 && <p>{order.user.address.address2}</p>}
                      <p>{order.user.address.city}, {order.user.address.state} - {order.user.address.pincode}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">🛍️ Order Items</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 bg-gray-50">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-24 object-cover rounded mb-2" 
                      />
                      <div className="text-sm">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-gray-600">Brand: {item.brand || 'N/A'}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-green-600 font-semibold">₹{item.price}</p>
                        <p className="text-gray-800 font-semibold">
                          Total: ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                
                <button
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                >
                  {selectedOrder === order.id ? 'Hide Details' : 'Show Details'}
                </button>
                
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                >
                  Delete Order
                </button>
              </div>

              {/* Detailed View */}
              {selectedOrder === order.id && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold mb-2">Order Summary</h5>
                  <div className="text-sm space-y-1">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Total Items:</strong> {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    <p><strong>Order Value:</strong> ₹{order.total.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Ordered on:</strong> {order.date}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;