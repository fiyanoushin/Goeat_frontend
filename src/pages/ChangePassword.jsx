
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const ChangePassword = () => {
  const { authUser } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword.trim()) return toast.error("Password cannot be empty");
    setLoading(true);

    try {
      await axios.patch(`http://localhost:3000/users/${authUser.id}`, {
        password: newPassword,
      });

      toast.success("Password updated successfully");
      setNewPassword("");
    } catch (err) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">🔐 Change Password</h2>
      <input
        type="password"
        className="w-full px-4 py-2 border rounded mb-4"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        onClick={handleChangePassword}
        disabled={loading}
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
