import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const res = await register({ name, email, password });
    if (res.error) {
      setError(res.error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={handleChange} />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">Register</button>
      </form>
    </div>
  );
};

export default Signup;
