import { useState, useEffect } from 'react';
import { Plus, Package, TrendingUp, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type SellerDashboardProps = {
  isLoggedIn: boolean;
  onNavigateToAuth: () => void;
};

export type SellerProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  views: number;
  status: string;
  location: string;
};

export function SellerDashboard({ isLoggedIn, onNavigateToAuth }: SellerDashboardProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewProduct, setViewProduct] = useState<SellerProduct | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Necklaces',
    weight: '',
    purity: '22K',
    description: '',
    location: '',
    image: null as File | null,
  });

  const [products, setProducts] = useState<SellerProduct[]>(() => {
    try {
      const saved = localStorage.getItem('sellerProducts');
      if (saved) return JSON.parse(saved);
    } catch {}
    
    return [
      {
        id: '1',
        name: 'Diamond Gold Necklace',
        price: 24999,
        category: 'Necklaces',
        image: 'https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBqZXdlbHJ5fGVufDF8fHx8MTc3MzAyNjY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
        views: 1240,
        status: 'Active',
        location: 'Mumbai, Maharashtra',
      },
      {
        id: '2',
        name: 'Designer Gold Bracelet',
        price: 18999,
        category: 'Bracelets',
        image: 'https://images.unsplash.com/photo-1629587424599-ee8806a66127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXQlMjBsdXh1cnl8ZW58MXx8fHwxNzczMDAwODMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        views: 856,
        status: 'Active',
        location: 'Delhi',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('sellerProducts', JSON.stringify(products));
  }, [products]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product: SellerProduct) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      weight: '',
      purity: '22K',
      description: '',
      location: product.location || '',
      image: null,
    });
    setImagePreview(product.image);
    setEditingId(product.id);
    setShowAddProduct(true);
  };

  const resetForm = () => {
    setShowAddProduct(false);
    setEditingId(null);
    setFormData({
      name: '',
      price: '',
      category: 'Necklaces',
      weight: '',
      purity: '22K',
      description: '',
      location: '',
      image: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? {
        ...p,
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        location: formData.location,
        image: imagePreview || p.image,
      } : p));
    } else {
      // Create new product object
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        location: formData.location,
        image: imagePreview || 'https://images.unsplash.com/photo-1599643477874-5c92ed715d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5fGVufDF8fHx8MTc3MzAyNjY0MXww&ixlib=rb-4.1.0&q=80&w=1080', // Fallback placeholder if no image
        views: 0,
        status: 'Active',
      };

      setProducts(prev => [newProduct, ...prev]);
    }
    
    resetForm();
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 text-amber-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Seller Dashboard</h2>
        <p className="text-xl text-gray-600 mb-8">
          Please login as a seller to access the dashboard and manage your products
        </p>
        <button
          onClick={onNavigateToAuth}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
        >
          Login as Seller
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Manage your products and track performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Products</span>
            <Package className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold">{products.length}</p>
          <p className="text-sm text-green-600 mt-1">+2 this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Sales</span>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">₹2.4L</p>
          <p className="text-sm text-green-600 mt-1">+15% this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Views</span>
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">8.2K</p>
          <p className="text-sm text-green-600 mt-1">+24% this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Conversion</span>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">3.2%</p>
          <p className="text-sm text-green-600 mt-1">+0.8% this month</p>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Products</h2>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g., 15g"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    <option>Necklaces</option>
                    <option>Rings</option>
                    <option>Earrings</option>
                    <option>Bracelets</option>
                    <option>Bangles</option>
                    <option>Pendants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Purity</label>
                  <select
                    value={formData.purity}
                    onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    <option>18K</option>
                    <option>22K</option>
                    <option>24K</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-amber-500 transition relative overflow-hidden group">
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    title="Upload image"
                  />
                  {imagePreview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <p className="text-white font-semibold">Click to change image</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Product</th>
              <th className="text-left px-6 py-4 font-semibold">Category</th>
              <th className="text-left px-6 py-4 font-semibold">Price</th>
              <th className="text-left px-6 py-4 font-semibold">Location</th>
              <th className="text-left px-6 py-4 font-semibold">Status</th>
              <th className="text-left px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4 font-semibold">₹{product.price.toLocaleString()}</td>
                <td className="px-6 py-4">{product.location}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setViewProduct(product)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition" 
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition" 
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this product?')) {
                          setProducts(prev => prev.filter(p => p.id !== product.id));
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Product Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{viewProduct.name}</h3>
              <button onClick={() => setViewProduct(null)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>
            <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="space-y-2">
              <p><span className="font-semibold">Category:</span> {viewProduct.category}</p>
              <p><span className="font-semibold">Price:</span> ₹{viewProduct.price.toLocaleString()}</p>
              <p><span className="font-semibold">Location:</span> {viewProduct.location}</p>
              <p><span className="font-semibold">Views:</span> {viewProduct.views.toLocaleString()}</p>
              <p className="flex items-center gap-2"><span className="font-semibold">Status:</span> 
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {viewProduct.status}
                </span>
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setViewProduct(null)} 
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
