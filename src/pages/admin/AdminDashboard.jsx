import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";
import { toast } from "react-toastify";
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
    total_users: 0,
    total_products: 0,
    total_orders: 0,
    total_revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await API.get("admin/stats/");
      setStats(res.data);
      toast.success("Dashboard data refreshed ✅");
    } catch (err) {
      console.error("Error fetching stats:", err);
      toast.error("Failed to fetch admin data ⚠️");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully 👋");
    navigate("/login");
  };

  const pieData = [
    { name: "Users", value: stats.total_users },
    { name: "Products", value: stats.total_products },
    { name: "Orders", value: stats.total_orders },
  ];

  const COLORS = ["#6366F1", "#EC4899", "#F59E0B"];

  // Dummy trend data (replace with real revenue trends later)
  const revenueTrend = [
    { month: "Jan", revenue: stats.total_revenue * 0.3 },
    { month: "Feb", revenue: stats.total_revenue * 0.45 },
    { month: "Mar", revenue: stats.total_revenue * 0.6 },
    { month: "Apr", revenue: stats.total_revenue * 0.8 },
    { month: "May", revenue: stats.total_revenue },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-pink-700">
          Admin Dashboard 🎯
        </h2>
        <div className="flex gap-3">
          <button
            onClick={fetchStats}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Users" value={stats.total_users} color="blue" />
        <Card title="Products" value={stats.total_products} color="green" />
        <Card title="Orders" value={stats.total_orders} color="yellow" />
        <Card
          title="Revenue (₹)"
          value={stats.total_revenue.toLocaleString()}
          color="pink"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
            System Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend Chart */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 6, stroke: "#065F46", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 mt-10">
        <NavButton
          label="Manage Products"
          onClick={() => navigate("/admin/manage-products")}
          color="purple"
        />
        <NavButton
          label="Manage Users"
          onClick={() => navigate("/admin/manage-users")}
          color="indigo"
        />
        <NavButton
          label="Manage Orders"
          onClick={() => navigate("/admin/manage-orders")}
          color="green"
        />
      </div>
    </div>
  );
};

// ===== Subcomponents =====
const Card = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    pink: "bg-pink-100 text-pink-700",
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-sm hover:shadow-md transition text-center ${colors[color]}`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

const NavButton = ({ label, onClick, color }) => {
  const colors = {
    purple: "bg-purple-600 hover:bg-purple-700",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    green: "bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white px-6 py-2 rounded-lg transition`}
    >
      {label}
    </button>
  );
};

export default AdminDashboard;
