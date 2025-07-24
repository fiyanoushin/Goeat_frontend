import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/products"),
          fetch("http://localhost:3000/orders"),
        ]);

        const users = await usersRes.json();
        const products = await productsRes.json();
        const orders = await ordersRes.json();

        setStats({
          users: users.length,
          products: products.length,
          orders: orders.length,
        });

        const revenue = orders.reduce((acc, order) => acc + order.total, 0);
        setTotalRevenue(revenue);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pieData = [
    { name: "Users", value: stats.users },
    { name: "Products", value: stats.products },
    { name: "Orders", value: stats.orders },
  ];

  const COLORS = ["#6366F1", "#EC4899", "#F59E0B"];

  const revenueData = [{ name: "Total Revenue (₹)", value: totalRevenue }];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-pink-700">Welcome Admin 🎉</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl font-bold text-green-600">{stats.products}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.orders}</p>
        </div>
      </div>

      {/* Combined Charts in Single Row */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded shadow mb-10">
        {/* Pie Chart */}
        <div className="flex-1 min-w-[300px]">
          <h3 className="text-xl font-semibold mb-4 text-center">Statistics Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="flex-1 min-w-[300px]">
          <h3 className="text-xl font-semibold mb-4 text-center">Total Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={3}
                dot={{
                  r: 6,
                  stroke: "#065F46",
                  strokeWidth: 2,
                  fill: "#10B981",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center mt-4 text-lg font-bold text-green-600">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/admin/manage-products")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Manage Products
        </button>
        <button
          onClick={() => navigate("/admin/manage-users")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Manage Users
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
