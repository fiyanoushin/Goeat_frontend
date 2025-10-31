// src/pages/Menu.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const { data } = await API.get("categories/");
        if (isMounted) setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
        if (isMounted)
          setErrorMsg(
            err.response?.data?.detail ||
              "Something went wrong while fetching categories."
          );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();

    // ✅ Cleanup to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  // ⚙️ Loading State - Enhanced
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
        <div className="flex gap-3 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-gray-700 text-xl font-medium animate-pulse">
          🍰 Loading categories...
        </p>
      </div>
    );
  }

  // ❌ Error State - Enhanced
  if (errorMsg) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md">
          <div className="text-6xl mb-6">😕</div>
          <p className="text-red-500 text-lg font-semibold mb-6">
            {errorMsg}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/50 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 🧁 Empty State - Enhanced
  if (categories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
        <div className="text-center">
          <div className="text-8xl mb-6">🍩</div>
          <p className="text-gray-600 text-xl font-medium">
            No categories available at the moment.
          </p>
          <p className="text-gray-500 mt-2">Check back soon for delicious treats!</p>
        </div>
      </div>
    );
  }

  // ✅ Main UI - Enhanced
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-16 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-bounce inline-block">🍰</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
            Explore Our Desserts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-700 text-xl font-light max-w-2xl mx-auto">
            Find your favorite treat from our delicious categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
              
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500">
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={
                      category.image ||
                      `${process.env.PUBLIC_URL}/assets/default.jpg`
                    }
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-600/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white rounded-full p-4 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Category Name */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-500 group-hover:bg-clip-text transition-all duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Animated underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-3 group-hover:w-16 transition-all duration-500 rounded-full" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;