import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';

type ProductCatalogProps = {
  onViewProduct: (product: Product) => void;
  selectedCategory: string;
};

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Gold Necklace',
    price: 24999,
    category: 'Necklaces',
    weight: '15g',
    purity: '22K',
    image: 'https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBqZXdlbHJ5fGVufDF8fHx8MTc3MzAyNjY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Jewels Emporium',
    description: 'Elegant 22K gold necklace with diamond accents',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Solitaire Gold Ring',
    price: 12499,
    category: 'Rings',
    weight: '5g',
    purity: '18K',
    image: 'https://images.unsplash.com/photo-1719559746390-57f3af2794ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwcmluZyUyMGRpYW1vbmR8ZW58MXx8fHwxNzczMDI5MjMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Royal Gold',
    description: 'Classic 18K gold ring with solitaire diamond',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Designer Gold Bracelet',
    price: 18999,
    category: 'Bracelets',
    weight: '12g',
    purity: '22K',
    image: 'https://images.unsplash.com/photo-1629587424599-ee8806a66127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXQlMjBsdXh1cnl8ZW58MXx8fHwxNzczMDAwODMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Luxury Ornaments',
    description: 'Stunning designer bracelet in pure 22K gold',
    rating: 4.7,
    reviews: 56,
  },
  {
    id: '4',
    name: 'Pearl Gold Earrings',
    price: 8999,
    category: 'Earrings',
    weight: '6g',
    purity: '18K',
    image: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZWFycmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc3Mjk5NDY0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Tradition Gems',
    description: 'Elegant pearl earrings in 18K gold',
    rating: 4.6,
    reviews: 78,
  },
  {
    id: '5',
    name: 'Gold Chain Pendant',
    price: 15999,
    category: 'Pendants',
    weight: '8g',
    purity: '22K',
    image: 'https://images.unsplash.com/photo-1771515411694-57fb626159d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY2hhaW4lMjBwZW5kYW50fGVufDF8fHx8MTc3MzAxMzgzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Golden Touch',
    description: 'Beautiful pendant with chain in 22K gold',
    rating: 4.5,
    reviews: 92,
  },
  {
    id: '6',
    name: 'Traditional Gold Bangles',
    price: 21999,
    category: 'Bangles',
    weight: '18g',
    purity: '22K',
    image: 'https://images.unsplash.com/photo-1606293926249-ed22e446d476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYmFuZ2xlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzczMDI5MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Heritage Gold',
    description: 'Traditional Indian bangles in pure 22K gold',
    rating: 4.9,
    reviews: 145,
  },
  {
    id: '7',
    name: 'Wedding Ring Set',
    price: 29999,
    category: 'Rings',
    weight: '10g',
    purity: '18K',
    image: 'https://images.unsplash.com/photo-1758995116142-c626a962a682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwd2VkZGluZyUyMHJpbmclMjBzZXR8ZW58MXx8fHwxNzczMDI5MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Forever Jewels',
    description: 'Matching wedding ring set in 18K gold',
    rating: 5.0,
    reviews: 203,
  },
  {
    id: '8',
    name: 'Temple Jewellery Set',
    price: 35999,
    category: 'Necklaces',
    weight: '25g',
    purity: '22K',
    image: 'https://images.unsplash.com/photo-1678378819861-158c3ff303d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGdvbGQlMjBqZXdlbHJ5JTIwSW5kaWF8ZW58MXx8fHwxNzczMDI5MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Divine Ornaments',
    description: 'Traditional temple jewelry necklace set',
    rating: 4.8,
    reviews: 167,
  },
  {
    id: '9',
    name: 'Gold Anklet Chain',
    price: 11999,
    category: 'Bracelets',
    weight: '7g',
    purity: '18K',
    image: 'https://images.unsplash.com/photo-1758995116383-f51775896add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYW5rbGV0JTIwY2hhaW58ZW58MXx8fHwxNzczMDI5MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Elegant Designs',
    description: 'Delicate anklet chain in 18K gold',
    rating: 4.4,
    reviews: 64,
  },
  {
    id: '10',
    name: 'Diamond Nose Pin',
    price: 4999,
    category: 'Earrings',
    weight: '2g',
    purity: '18K',
    image: 'https://images.unsplash.com/photo-1545873509-33e944ca7655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbm9zZSUyMHBpbiUyMHN0dWR8ZW58MXx8fHwxNzczMDI5MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    seller: 'Sparkle Studio',
    description: 'Small diamond nose pin in 18K gold',
    rating: 4.7,
    reviews: 112,
  },
];

export function ProductCatalog({ onViewProduct, selectedCategory }: ProductCatalogProps) {
  const [filterCategory, setFilterCategory] = useState(selectedCategory);
  const [filterPurity, setFilterPurity] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = allProducts.filter((product) => {
    if (filterCategory !== 'all' && product.category !== filterCategory) return false;
    if (filterPurity !== 'all' && product.purity !== filterPurity) return false;
    if (priceRange === 'low' && product.price > 10000) return false;
    if (priceRange === 'mid' && (product.price < 10000 || product.price > 20000)) return false;
    if (priceRange === 'high' && product.price < 20000) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {['all', 'Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Bangles', 'Pendants'].map((cat) => (
                  <label key={cat} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={filterCategory === cat}
                      onChange={() => setFilterCategory(cat)}
                      className="mr-2 accent-amber-600"
                    />
                    <span className="text-gray-700">{cat === 'all' ? 'All Categories' : cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Purity Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Purity</h3>
              <div className="space-y-2">
                {['all', '18K', '22K', '24K'].map((purity) => (
                  <label key={purity} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="purity"
                      checked={filterPurity === purity}
                      onChange={() => setFilterPurity(purity)}
                      className="mr-2 accent-amber-600"
                    />
                    <span className="text-gray-700">{purity === 'all' ? 'All Purity' : purity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'all'}
                    onChange={() => setPriceRange('all')}
                    className="mr-2 accent-amber-600"
                  />
                  <span className="text-gray-700">All Prices</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'low'}
                    onChange={() => setPriceRange('low')}
                    className="mr-2 accent-amber-600"
                  />
                  <span className="text-gray-700">Under ₹10,000</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'mid'}
                    onChange={() => setPriceRange('mid')}
                    className="mr-2 accent-amber-600"
                  />
                  <span className="text-gray-700">₹10,000 - ₹20,000</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'high'}
                    onChange={() => setPriceRange('high')}
                    className="mr-2 accent-amber-600"
                  />
                  <span className="text-gray-700">Above ₹20,000</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterPurity('all');
                setPriceRange('all');
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gold Jewellery</h1>
              <p className="text-gray-600">{sortedProducts.length} products found</p>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer group overflow-hidden border border-gray-100"
                  onClick={() => onViewProduct(product)}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.purity}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{product.seller}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-amber-600">₹{product.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{product.weight}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-semibold">{product.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{product.reviews} reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
