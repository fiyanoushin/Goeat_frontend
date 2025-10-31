import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.info("Removed from wishlist 💔");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart 🛒");
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-4">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-pulse">💔</div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
            Browse our collection and save your favorite desserts for later!
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/assets/empty_wishlist.svg`}
            alt="Empty Wishlist"
            className="w-64 mx-auto mb-6 opacity-80"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-6 py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-pulse">💖</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
            Your Wishlist
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-lg">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} you love
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item, index) => {
            const product = item.product_details || item.product;
            return (
              <div
                key={product.id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                  {/* Image with love badge */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={
                        product.image ||
                        `${process.env.PUBLIC_URL}/assets/default.jpg`
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) =>
                        (e.target.src = `${process.env.PUBLIC_URL}/assets/default.jpg`)
                      }
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Love badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                      <span>💖</span>
                      <span>Loved</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium mb-3">
                        {product.category_name || "Uncategorized"}
                      </p>
                      <p className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                        ₹{parseFloat(product.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group/btn"
                      >
                        <svg
                          className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
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
                        Add to Cart
                      </button>

                      <button
                        onClick={() => handleRemove(product.id)}
                        className="px-4 py-3 rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300 font-semibold group/btn"
                      >
                        <svg
                          className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action buttons at bottom */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              wishlist.forEach((item) => {
                const product = item.product_details || item.product;
                handleAddToCart(product);
              });
            }}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-pink-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add All to Cart
          </button>
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

export default Wishlist;