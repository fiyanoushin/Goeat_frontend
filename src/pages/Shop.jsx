import React, { useEffect, useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import API from "../api";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(500);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get("products/");
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derive unique categories
  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category_name || "Uncategorized"))],
    [products]
  );

  // Filter + Sort (memoized for performance)
  const filtered = useMemo(() => {
    let data = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category_name === category;
      const matchesPrice = p.price <= price;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "priceLowHigh":
        data.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        data.sort((a, b) => b.price - a.price);
        break;
      case "nameAZ":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return data;
  }, [search, category, price, sort, products]);

  if (loading)
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
        <p className="text-gray-700 text-xl font-medium">Loading desserts...</p>
      </div>
    );

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-pulse">🍰</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
            Sweet Shop
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
        </div>

        {/* Filters - Enhanced */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search desserts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300 bg-white"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300 bg-white font-medium text-gray-700"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 px-2">
                Max Price: ₹{price}
              </label>
              <input
                type="range"
                min={0}
                max={500}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="accent-pink-500 w-full h-2 rounded-lg cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(236, 72, 153) 0%, rgb(236, 72, 153) ${
                    (price / 500) * 100
                  }%, rgb(254, 205, 211) ${(price / 500) * 100}%, rgb(254, 205, 211) 100%)`,
                }}
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300 bg-white font-medium text-gray-700"
            >
              <option value="default">Sort by</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="nameAZ">Name: A–Z</option>
              <option value="nameZA">Name: Z–A</option>
            </select>
          </div>

          {/* Filter summary */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing <span className="font-bold text-pink-600">{filtered.length}</span> of{" "}
            <span className="font-bold text-gray-800">{products.length}</span> desserts
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((product, index) => {
              const inWishlist = wishlist.some((w) => w.product.id === product.id);
              return (
                <div
                  key={product.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />

                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500">
                    {/* Image */}
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Wishlist badge */}
                      {inWishlist && (
                        <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          💖 Loved
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium">
                          {product.category_name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                          ₹{product.price}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group/btn"
                        >
                          <svg
                            className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Cart
                        </button>

                        <button
                          onClick={() => addToWishlist(product)}
                          className={`px-4 py-2.5 rounded-xl border-2 transition-all duration-300 font-semibold ${
                            inWishlist
                              ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white border-transparent shadow-lg shadow-pink-500/50"
                              : "text-pink-600 border-pink-600 hover:bg-pink-50 hover:border-pink-700"
                          }`}
                        >
                          {inWishlist ? "💖" : "🤍"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-8xl mb-6">😕</div>
            <p className="text-gray-600 text-xl font-medium mb-2">
              No desserts match your filters
            </p>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
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

export default Shop;