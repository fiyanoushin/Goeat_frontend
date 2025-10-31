import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

const ITEMS_PER_PAGE = 5;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", brand: "", price: "", category: "", image: "" });
  const [page, setPage] = useState(1);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try { const res = await API.get("/products"); setProducts(res.data); } 
    catch { toast.error("Failed to load products"); }
  };

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(p => ({ ...p, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const { name, price, category, image } = formData;
    if (!name || !price || !category || !image) return toast.error("Please fill all fields");
    try {
      if (editProduct) await API.put(`/products/${editProduct.id}`, formData);
      else await API.post("/products", { ...formData, active: true });
      toast.success(editProduct ? "Product updated" : "Product added");
      setFormData({ name: "", brand: "", price: "", category: "", image: "" });
      setShowModal(false); fetchProducts();
    } catch { toast.error("Error saving product"); }
  };

  const handleDelete = async id => {
    if (!window.confirm("Soft delete this product?")) return;
    try { await API.patch(`/products/${id}`, { active: false }); toast.info("Product deleted"); fetchProducts(); } 
    catch { toast.error("Error deleting product"); }
  };

  const visible = products.filter(p => p.active !== false);
  const totalPages = Math.ceil(visible.length / ITEMS_PER_PAGE);
  const displayed = visible.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-700 mb-6">🛍️ Manage Products</h2>
      <button onClick={() => { setShowModal(true); setEditProduct(null); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4">+ Add Product</button>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100"><tr><th className="p-3 border">Name</th><th className="p-3 border">Brand</th><th className="p-3 border">Price</th><th className="p-3 border">Category</th><th className="p-3 border text-center">Actions</th></tr></thead>
          <tbody>
            {displayed.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.brand}</td>
                <td className="p-3 border">₹{p.price}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border text-center space-x-2">
                  <button onClick={() => { setEditProduct(p); setFormData(p); setShowModal(true); }} className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && <div className="flex justify-between items-center py-3 px-4 bg-gray-50"><button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 border rounded">Prev</button><span>Page {page} of {totalPages}</span><button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button></div>}
      </div>

      {showModal && <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <h3 className="text-xl font-semibold mb-4">{editProduct ? "Edit Product" : "Add Product"}</h3>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 mb-2 rounded" />
          <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full border p-2 mb-2 rounded" />
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" className="w-full border p-2 mb-2 rounded" />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 mb-2 rounded" />
          <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full border p-2 mb-2 rounded" />
          {formData.image && <img src={formData.image} alt="preview" className="w-32 h-32 rounded object-cover mx-auto mb-3" />}
          <div className="flex justify-end gap-2"><button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editProduct ? "Update" : "Add"}</button><button onClick={()=>setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button></div>
        </div>
      </div>}
    </div>
  );
};

export default ManageProducts;
