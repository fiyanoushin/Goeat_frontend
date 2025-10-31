// import { Link } from "react-router-dom";
// import { FaShoppingCart, FaHeart, FaUser, FaBox } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";


// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const { authUser, logout } = useAuth();
 

//   return (
//     <nav className="bg-pink-600 p-6 shadow-md relative">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-white">🍰 Go Eat</h1>

//         <div className="hidden md:flex items-center space-x-6">
//           <Link to="/" className="text-white hover:underline">Home</Link>
//           <Link to="/menu" className="text-white hover:underline">Menu</Link>
//           <Link to="/shop" className="text-white hover:underline">Products</Link>
//           <Link to="/cart" className="text-white hover:underline flex items-center">
//             <FaShoppingCart className="mr-1" /> Cart
//           </Link>
//           <Link to="/wishlist" className="text-white hover:underline flex items-center">
//             <FaHeart className="mr-1" /> Wishlist
//           </Link>
//           <Link to="/orders" className="text-white hover:underline flex items-center">
//             <FaBox className="mr-1" /> orders
//           </Link>
         

//           {authUser ? (
//             <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="text-white flex items-center hover:underline"
//               >
//                 <FaUser className="mr-1" /> {authUser.name}
//               </button>
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 bg-white rounded shadow-lg z-10 w-40">
//                   <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
//                   <Link to="/change-password" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Change Password</Link>
//                   <button
//                     onClick={logout}
//                     className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login" className="text-white hover:underline flex items-center">
//               <FaUser className="mr-1" /> Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile */}
//         <div className="md:hidden">
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {isMobileMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="md:hidden mt-3 space-y-2 px-4 pb-4">
//           <Link to="/" className="block text-white hover:underline">Home</Link>
//           <Link to="/menu" className="block text-white hover:underline">Menu</Link>
//           <Link to="/cart" className="block text-white hover:underline">Cart</Link>
//           <Link to="/wishlist" className="block text-white hover:underline">Wishlist</Link>
//           <Link to="/orders" className="block text-white hover:underline">Orders</Link>
//           {authUser ? (
//             <>
//               <Link to="/profile" className="block text-white hover:underline">Profile</Link>
//               <Link to="/change-password" className="block text-white hover:underline">Change Password</Link>
//               <button onClick={logout} className="text-white">Logout</button>
//             </>
//           ) : (
//             <Link to="/login" className="block text-white hover:underline">Login</Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaBox } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { authUser, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group">
            <h1 className="text-3xl font-black text-white flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
              <span className="inline-block transform group-hover:rotate-12 transition-transform duration-300">🍰</span>
              <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                Go Eat
              </span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className="text-white/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="text-white/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Menu
            </Link>
            <Link 
              to="/shop" 
              className="text-white/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Products
            </Link>
            
            <Link 
              to="/cart" 
              className="text-white/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium flex items-center gap-2 group"
            >
              <FaShoppingCart className="group-hover:scale-110 transition-transform duration-300" /> 
              Cart
            </Link>
            
            <Link 
              to="/wishlist" 
              className="text-white/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium flex items-center gap-2 group"
            >
              <FaHeart className="group-hover:scale-110 transition-transform duration-300" /> 
              Wishlist
            </Link>
            
            <Link 
              to="/orders" 
              className="text-white/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium flex items-center gap-2 group"
            >
              <FaBox className="group-hover:scale-110 transition-transform duration-300" /> 
              Orders
            </Link>

            {authUser ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-white px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 font-medium flex items-center gap-2 backdrop-blur-sm border border-white/20"
                >
                  <FaUser className="text-sm" /> 
                  <span className="max-w-32 truncate">{authUser.name}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-2xl z-20 w-56 overflow-hidden border border-pink-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-200 font-medium"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaUser className="text-pink-600" />
                        Profile
                      </Link>
                      <Link 
                        to="/change-password" 
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-200 font-medium"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Change Password
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-white px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 font-semibold flex items-center gap-2 backdrop-blur-sm border border-white/20 ml-2"
              >
                <FaUser /> 
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-pink-700 to-rose-700 border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            <Link 
              to="/" 
              className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              to="/shop" 
              className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaShoppingCart /> Cart
            </Link>
            <Link 
              to="/wishlist" 
              className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaHeart /> Wishlist
            </Link>
            <Link 
              to="/orders" 
              className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaBox /> Orders
            </Link>
            
            {authUser ? (
              <>
                <div className="border-t border-white/20 my-2 pt-2">
                  <div className="text-white/70 text-sm px-4 py-2 font-medium">
                    Welcome, {authUser.name}
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser /> Profile
                </Link>
                <Link 
                  to="/change-password" 
                  className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Change Password
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-red-200 hover:bg-red-500/20 px-4 py-3 rounded-xl transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUser /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;