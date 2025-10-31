import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ✅ Always use deployed API URL from .env
        const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

        const res = await axios.get(`${baseURL}products/?category=${encodeURIComponent(categoryName)}`);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("❌ Error fetching products by category:", error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-pink-600 text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-pink-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-pink-600">
        🍰 {categoryName} Desserts
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
