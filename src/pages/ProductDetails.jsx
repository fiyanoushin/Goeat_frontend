// import { useEffect, useState, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { toast } from "react-toastify";
// import API from "../api";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const { addToCart } = useCart();
//   const { addToWishlist, wishlist } = useWishlist();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       setError(false);
//       try {
//         const { data } = await API.get(`products/${id}/`);
//         setProduct(data);
//       } catch (err) {
//         console.error("❌ Error fetching product:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // ✅ Derived states
//   const inWishlist = useMemo(
//     () => wishlist.some((w) => w.id === product?.id || w.product?.id === product?.id),
//     [wishlist, product]
//   );

//   // ⚙️ Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-pink-50">
//         <p className="text-gray-600 text-lg animate-pulse">🍰 Loading product details...</p>
//       </div>
//     );
//   }

//   // ❌ Error state
//   if (error || !product) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-pink-50">
//         <p className="text-red-500 font-medium text-lg">
//           Failed to load product. Please try again later.
//         </p>
//       </div>
//     );
//   }

//   // ✅ Add to cart / wishlist handlers
//   const handleAddToCart = () => {
//     addToCart(product);
//     toast.success(`${product.name} added to cart 🛒`);
//   };

//   const handleAddToWishlist = () => {
//     addToWishlist(product);
//     toast.success(
//       inWishlist
//         ? `${product.name} is already in your wishlist 💖`
//         : `${product.name} added to wishlist 💖`
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-2xl mt-10">
//       <div className="grid md:grid-cols-2 gap-10 items-center">
//         {/* ✅ Product Image */}
//         <div className="flex justify-center">
//           <img
//             src={product.image || `${process.env.PUBLIC_URL}/assets/default.jpg`}
//             alt={product.name || "Product"}
//             className="w-full max-w-md h-96 object-cover rounded-2xl shadow-md border border-gray-100"
//             loading="lazy"
//           />
//         </div>

//         {/* ✅ Product Info */}
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-3">
//             {product.name || "Unnamed Product"}
//           </h2>
//           <p className="text-gray-700 leading-relaxed mb-5">
//             {product.description || "No description available."}
//           </p>

//           <p className="text-2xl font-extrabold text-gray-800 mb-6">
//             ₹{parseFloat(product.price || 0).toFixed(2)}
//           </p>

//           <div className="flex gap-4 flex-wrap">
//             <button
//               onClick={handleAddToCart}
//               className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2 rounded-full shadow transition-all"
//             >
//               Add to Cart
//             </button>

//             <button
//               onClick={handleAddToWishlist}
//               className={`font-medium px-6 py-2 rounded-full border transition-all ${
//                 inWishlist
//                   ? "bg-pink-600 text-white border-pink-600 hover:bg-pink-700"
//                   : "text-pink-600 border-pink-600 hover:bg-pink-50"
//               }`}
//             >
//               {inWishlist ? "💖 In Wishlist" : "Add to Wishlist"}
//             </button>
//           </div>

//           {!product.active && (
//             <p className="mt-4 text-red-600 font-semibold">
//               ⚠️ This product is currently unavailable.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import API from "../api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await API.get(`products/${id}/`);
        setProduct(data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const inWishlist = useMemo(
    () => wishlist.some((w) => w.id === product?.id || w.product?.id === product?.id),
    [wishlist, product]
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <svg className="animate-spin h-16 w-16 text-pink-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            Loading product details...
          </p>
          <p className="text-gray-600 mt-2">Please wait a moment 🍰</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 p-12">
          <span className="text-6xl mb-6 block">⚠️</span>
          <h2 className="text-3xl font-black mb-4 text-red-600">
            Product Not Found
          </h2>
          <p className="text-gray-700 text-lg">
            Failed to load product. Please try again later.
          </p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-pink-100 group">
                  <img
                    src={product.image || `${process.env.PUBLIC_URL}/assets/default.jpg`}
                    alt={product.name || "Product"}
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {!product.active && (
                  <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badge */}
              {product.brand && (
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold border-2 border-pink-200">
                    {product.brand}
                  </span>
                </div>
              )}

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent leading-tight">
                  {product.name || "Unnamed Product"}
                </h1>
              </div>

              {/* Description */}
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200">
                <p className="text-sm text-gray-600 font-medium mb-1">Price</p>
                <p className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ₹{parseFloat(product.price || 0).toFixed(2)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.active}
                  className={`flex-1 min-w-[200px] py-4 rounded-xl text-white font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    product.active
                      ? "bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-pink-500/50 hover:scale-105"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className={`flex-1 min-w-[200px] py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    inWishlist
                      ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-pink-500/50 hover:scale-105"
                      : "bg-white text-pink-600 border-2 border-pink-600 hover:bg-pink-50"
                  }`}
                >
                  <svg className="w-6 h-6" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{inWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
                </button>
              </div>

              {/* Unavailability Warning */}
              {!product.active && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-red-800 font-bold">Product Unavailable</p>
                    <p className="text-red-600 text-sm mt-1">This product is currently out of stock and cannot be added to cart.</p>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="border-t-2 border-pink-100 pt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Free shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">100% Authentic Products</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  <span className="text-gray-700">Easy returns within 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;