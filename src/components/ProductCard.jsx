import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-pink-600 font-semibold mt-1 text-lg">₹{product.price}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-pink-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200"
          >
            Add to Cart
          </button>

          <button
            onClick={() => addToWishlist(product)}
            className="flex-1 border border-pink-500 text-pink-500 font-medium py-2 px-4 rounded-lg hover:bg-pink-50 transition duration-200"
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
