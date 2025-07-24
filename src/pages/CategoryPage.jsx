import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '/db.json'
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
  const filtered = productsData.products.filter(
  (product) => product.category.toLowerCase() === categoryName.toLowerCase()
);

    setFilteredProducts(filtered);
  }, [categoryName]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">
        {categoryName} Products
      </h2>
      {filteredProducts.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
