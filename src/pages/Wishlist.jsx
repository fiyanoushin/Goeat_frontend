import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">💖 Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your wishlist is empty. Start exploring sweet treats!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-pink-700 text-lg mb-4">₹{item.price}</p>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
