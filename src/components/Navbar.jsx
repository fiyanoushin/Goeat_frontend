import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaBox } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { authUser, logout } = useAuth();
 

  return (
    <nav className="bg-pink-600 p-6 shadow-md relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">🍰 Go Eat</h1>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/menu" className="text-white hover:underline">Menu</Link>
          <Link to="/cart" className="text-white hover:underline flex items-center">
            <FaShoppingCart className="mr-1" /> Cart
          </Link>
          <Link to="/wishlist" className="text-white hover:underline flex items-center">
            <FaHeart className="mr-1" /> Wishlist
          </Link>
          <Link to="/orders" className="text-white hover:underline flex items-center">
            <FaBox className="mr-1" /> orders
          </Link>
         

          {authUser ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white flex items-center hover:underline"
              >
                <FaUser className="mr-1" /> {authUser.name}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded shadow-lg z-10 w-40">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/change-password" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Change Password</Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white hover:underline flex items-center">
              <FaUser className="mr-1" /> Login
            </Link>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-4 pb-4">
          <Link to="/" className="block text-white hover:underline">Home</Link>
          <Link to="/menu" className="block text-white hover:underline">Menu</Link>
          <Link to="/cart" className="block text-white hover:underline">Cart</Link>
          <Link to="/wishlist" className="block text-white hover:underline">Wishlist</Link>
          <Link to="/orders" className="block text-white hover:underline">Orders</Link>
          {authUser ? (
            <>
              <Link to="/profile" className="block text-white hover:underline">Profile</Link>
              <Link to="/change-password" className="block text-white hover:underline">Change Password</Link>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block text-white hover:underline">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
