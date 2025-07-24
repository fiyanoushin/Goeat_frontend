import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: '',
    image: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    const { name, price, category } = formData;
    if (!name || !price || !category) {
      return toast.error('Please fill all required fields');
    }

    try {
      if (editProduct) {
        await fetch(`http://localhost:3000/products/${editProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData })
        });
        toast.success('Product updated');
      } else {
        const existing = products.find(
          (p) => p.name === formData.name && p.category === formData.category
        );
        if (existing) return toast.error('Duplicate product');

        await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, active: true })
        });
        toast.success('Product added');
      }

      setFormData({ name: '', brand: '', price: '', category: '', image: '' });
      setShowModal(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to soft delete this product?');
    if (!confirm) return;
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: false })
      });
      toast.info('Product soft deleted');
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination logic
  const filteredProducts = products.filter(p => p.active !== false);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">Manage Products</h2>

      <button
        onClick={() => {
          setShowModal(true);
          setEditProduct(null);
        }}
        className="mb-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        + Add New Product
      </button>

      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Brand</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border">{product.brand}</td>
                <td className="p-3 border">₹{product.price}</td>
                <td className="p-3 border">{product.category}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 px-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-1 py-1 rounded ${currentPage === 1 ? 'bg-white' : 'bg-white text-black'}`}
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">
              Page <span className="font-bold">{currentPage}</span> of {totalPages}
            </p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-2 py-1 rounded ${currentPage === totalPages ? 'bg-white' : 'bg-white text-black '}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {editProduct ? 'Update Product' : 'Add Product'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product name"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Brand</label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Brand name"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Price (₹)</label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleAddOrUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editProduct ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
