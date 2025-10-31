import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!authUser) {
    return (
      <div className="p-6 text-center min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <p className="text-gray-600 text-lg mb-4">You need to log in to view your profile.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">
        👤 Your Profile
      </h2>

      <div className="space-y-3 text-gray-800">
        <p>
          <strong>Name:</strong> {authUser.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {authUser.email}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span className="capitalize">{authUser.role || "User"}</span>
        </p>
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
