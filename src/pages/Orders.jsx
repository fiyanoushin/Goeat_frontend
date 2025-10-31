// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import API from "../api"; // ✅ central axios instance (baseURL + token handling)

// const Orders = () => {
//   const { authUser } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!authUser) {
//       toast.info("Please login to view your orders.");
//       setOrders([]);
//       setLoading(false);
//       return;
//     }

//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const { data } = await API.get("orders/");

//         // ✅ Validate response
//         if (!Array.isArray(data)) {
//           throw new Error("Invalid data format from API");
//         }

//         // ✅ Sort latest first
//         const sorted = [...data].sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );

//         setOrders(sorted);
//       } catch (err) {
//         console.error("❌ Orders fetch error:", err);
//         const msg =
//           err.response?.data?.detail ||
//           "Failed to fetch orders. Please try again.";
//         toast.error(msg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [authUser]);

//   // ⚙️ Loading State
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-pink-50">
//         <p className="text-gray-600 text-lg animate-pulse">
//           🧁 Fetching your sweet orders...
//         </p>
//       </div>
//     );
//   }

//   // ⚠️ Not logged in
//   if (!authUser) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-pink-50">
//         <p className="text-gray-700 text-lg">
//           Please login to view your orders.
//         </p>
//       </div>
//     );
//   }

//   // 🪹 Empty State
//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-pink-50">
//         <p className="text-gray-700 text-lg">You have no orders yet.</p>
//       </div>
//     );
//   }

//   // ✅ Main UI
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-10">
//       <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
//         📦 Your Orders
//       </h2>

//       <div className="space-y-10 max-w-5xl mx-auto">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
//           >
//             <div className="mb-5 border-b pb-3">
//               <p className="text-gray-500 text-sm">
//                 Order Date:{" "}
//                 <span className="font-medium">
//                   {new Date(order.created_at).toLocaleString()}
//                 </span>
//               </p>
//               <p className="text-gray-700 font-semibold mt-1">
//                 Status:{" "}
//                 <span
//                   className={`${
//                     order.status === "completed"
//                       ? "text-green-600"
//                       : order.status === "pending"
//                       ? "text-blue-600"
//                       : "text-pink-600"
//                   } capitalize`}
//                 >
//                   {order.status}
//                 </span>
//               </p>
//               <p className="text-gray-800 font-semibold mt-1">
//                 Total: ₹{parseFloat(order.total || 0).toFixed(2)}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {Array.isArray(order.items) && order.items.length > 0 ? (
//                 order.items.map((item) => {
//                   const product = item.product_details || {};
//                   return (
//                     <div
//                       key={item.id}
//                       className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
//                     >
//                       <img
//                         src={
//                           product.image ||
//                           `${process.env.PUBLIC_URL}/assets/default.jpg`
//                         }
//                         alt={product.name || "Product"}
//                         className="w-full h-40 object-cover"
//                         loading="lazy"
//                       />
//                       <div className="p-4">
//                         <h3 className="font-semibold text-lg text-gray-800 truncate">
//                           {product.name || "Unnamed Product"}
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           Brand: {product.brand || "N/A"}
//                         </p>
//                         <p className="text-pink-600 font-bold mt-2">
//                           ₹{parseFloat(item.price || 0).toFixed(2)}
//                         </p>
//                         <p className="text-sm text-gray-700">
//                           Qty: {item.quantity || 0}
//                         </p>
//                         <p className="text-sm text-gray-800 font-semibold">
//                           Subtotal: ₹
//                           {(
//                             parseFloat(item.price || 0) * (item.quantity || 0)
//                           ).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="col-span-full text-gray-500 text-center">
//                   No items found in this order.
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import API from "../api";

const Orders = () => {
  const { authUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      toast.info("Please login to view your orders.");
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await API.get("orders/");

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from API");
        }

        const sorted = [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setOrders(sorted);
      } catch (err) {
        console.error("❌ Orders fetch error:", err);
        const msg =
          err.response?.data?.detail ||
          "Failed to fetch orders. Please try again.";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authUser]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <svg className="animate-spin h-16 w-16 text-pink-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            Fetching your sweet orders...
          </p>
          <p className="text-gray-600 mt-2">Please wait a moment 🧁</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 p-12">
          <span className="text-6xl mb-6 block">🔒</span>
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Authentication Required
          </h2>
          <p className="text-gray-700 text-lg">
            Please login to view your orders.
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 p-12">
          <span className="text-6xl mb-6 block">🛍️</span>
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            No Orders Yet
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Start shopping and your orders will appear here!
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl">📦</span>
          </div>
          <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Your Orders
          </h2>
          <p className="text-gray-600 text-lg">Track and manage your purchases</p>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-8 hover:shadow-2xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="mb-6 pb-6 border-b-2 border-pink-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-pink-600 to-rose-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Order Date</p>
                      <p className="text-gray-800 font-bold">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Status</p>
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mt-1 ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          order.status === "completed"
                            ? "bg-green-500"
                            : order.status === "pending"
                            ? "bg-blue-500"
                            : "bg-pink-500"
                        }`} />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-3 rounded-xl border-2 border-pink-200">
                      <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                      <p className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                        ₹{parseFloat(order.total || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item) => {
                    const product = item.product_details || {};
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-100 group"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={
                              product.image ||
                              `${process.env.PUBLIC_URL}/assets/default.jpg`
                            }
                            alt={product.name || "Product"}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <p className="text-sm font-bold text-pink-600">
                              Qty: {item.quantity || 0}
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                            {product.name || "Unnamed Product"}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {product.brand || "N/A"}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-500">Unit Price</p>
                              <p className="text-lg font-bold text-pink-600">
                                ₹{parseFloat(item.price || 0).toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Subtotal</p>
                              <p className="text-lg font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                ₹{(parseFloat(item.price || 0) * (item.quantity || 0)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <span className="text-4xl mb-4 block">📭</span>
                    <p className="text-gray-500 text-lg">No items found in this order.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;