// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-48 object-cover"
//       />

//       <div className="p-4">
//         <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
//         <p className="text-pink-600 font-semibold mt-1 text-lg">₹{product.price}</p>

//         <div className="flex gap-2 mt-4">
//           <button
//             onClick={() => addToCart(product)}
//             className="flex-1 bg-pink-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200"
//           >
//             Add to Cart
//           </button>

//           <button
//             onClick={() => addToWishlist(product)}
//             className="flex-1 border border-pink-500 text-pink-500 font-medium py-2 px-4 rounded-lg hover:bg-pink-50 transition duration-200"
//           >
//             Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);

  const inWishlist = wishlist.some(
    (w) => w.id === product?.id || w.product?.id === product?.id
  );

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success(
      inWishlist
        ? `${product.name} is already in your wishlist 💖`
        : `${product.name} added to wishlist 💖`
    );
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-pink-100 hover:border-pink-300">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 h-64">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
          </div>
        )}
        
        <img
          src={product.image || `${process.env.PUBLIC_URL}/assets/default.jpg`}
          alt={product.name}
          className={`w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Wishlist Button Overlay */}
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-4 right-4 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
            inWishlist
              ? "bg-pink-600 text-white scale-100"
              : "bg-white/90 text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-110"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill={inWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Brand Badge */}
        {product.brand && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <p className="text-xs font-bold text-pink-600">{product.brand}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-xl font-black text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>

        {/* Description (if available) */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            ₹{parseFloat(product.price).toFixed(2)}
          </p>
          {product.original_price && product.original_price > product.price && (
            <p className="text-sm text-gray-400 line-through">
              ₹{parseFloat(product.original_price).toFixed(2)}
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.active}
          className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            product.active
              ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-pink-500/50 hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{product.active ? "Add to Cart" : "Out of Stock"}</span>
        </button>

        {/* Product Status Indicator */}
        {product.active ? (
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">In Stock</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="font-medium">Unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;