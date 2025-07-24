import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const USERS_PER_PAGE = 5;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/users");
      const usersData = res.data;

      const usersWithStats = await Promise.all(
        usersData.map(async (user) => {
          if (user.role === "admin") return null;

          try {
            const [cartRes, wishlistRes, ordersRes] = await Promise.all([
              axios.get(`http://localhost:3000/cart?userId=${user.id}`),
              axios.get(`http://localhost:3000/wishlist?userId=${user.id}`),
              axios.get(`http://localhost:3000/orders?userId=${user.id}`),
            ]);

            const totalSpent = ordersRes.data.reduce((sum, order) => sum + order.total, 0);

            return {
              ...user,
              cartCount: cartRes.data.length,
              wishlistCount: wishlistRes.data.length,
              totalOrders: ordersRes.data.length,
              totalSpent,
            };
          } catch {
            return {
              ...user,
              cartCount: 0,
              wishlistCount: 0,
              totalOrders: 0,
              totalSpent: 0,
            };
          }
        })
      );

      const filteredUsers = usersWithStats.filter(Boolean);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserBlock = async (userId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        isBlocked: !currentStatus,
      });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isBlocked: !currentStatus } : user
        )
      );

      toast.success(`User ${!currentStatus ? "blocked" : "unblocked"} successfully`);
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const handlePageChange = (page) => setCurrentPage(page);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👥 Manage Users</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>🛒 Cart: {user.cartCount}</div>
                    <div>💖 Wishlist: {user.wishlistCount}</div>
                    <div>📦 Orders: {user.totalOrders}</div>
                    <div>💰 ₹{user.totalSpent.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => toggleUserBlock(user.id, user.isBlocked)}
                      className={`px-3 py-1 rounded text-white ${
                        user.isBlocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 py-4 bg-gray-100">
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => handlePageChange(num + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === num + 1
                      ? "bg-pink-600 text-white"
                      : "bg-white border border-gray-300 text-gray-600"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
