
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <p className="p-6 text-center">Please log in to view your profile.</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">👤 User Profile</h2>
      <p><strong>Name:</strong> {authUser.name}</p>
      <p className="mt-2"><strong>Email:</strong> {authUser.email}</p>
    </div>
  );
};

export default Profile;
