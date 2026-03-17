import { Search, Award, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';

type HomePageProps = {
  onNavigate: (page: 'home' | 'catalog' | 'detail' | 'seller' | 'auth' | 'cart') => void;
  onViewProduct: (product: Product) => void;
  onCategorySelect: (category: string) => void;
};

const featuredProducts: Product[] = [
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
];

const categories = [
  { name: 'Necklaces', icon: '💎', count: 245 },
  { name: 'Rings', icon: '💍', count: 389 },
  { name: 'Earrings', icon: '✨', count: 312 },
  { name: 'Bracelets', icon: '⭐', count: 198 },
  { name: 'Bangles', icon: '🔆', count: 267 },
  { name: 'Pendants', icon: '🌟', count: 156 },
];

export function HomePage({ onNavigate, onViewProduct, onCategorySelect }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-yellow-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Buy & Sell Gold Jewellery
                <span className="text-amber-600"> With Confidence</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                India's most trusted platform for authentic gold jewellery. Connect with verified sellers and find your perfect piece.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center gap-2"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('seller')}
                  className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition"
                >
                  Become a Seller
                </button>
              </div>

              {/* Search Bar */}
              <div className="mt-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for necklaces, rings, earrings..."
                    className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBqZXdlbHJ5fGVufDF8fHx8MTc3MzAyNjY0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gold jewelry"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1719559746390-57f3af2794ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwcmluZyUyMGRpYW1vbmR8ZW58MXx8fHwxNzczMDI5MjMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gold ring"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629587424599-ee8806a66127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXQlMjBsdXh1cnl8ZW58MXx8fHwxNzczMDAwODMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gold bracelet"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZWFycmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc3Mjk5NDY0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gold earrings"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Authentic</h3>
              <p className="text-gray-600">All jewellery verified with hallmark certification and purity guarantee</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Sellers</h3>
              <p className="text-gray-600">Connect with trusted and verified gold jewellery sellers nationwide</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Transparent pricing based on live gold rates with no hidden charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategorySelect(category.name)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button
              onClick={() => onNavigate('catalog')}
              className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition">{product.name}</h3>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Selling?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of sellers on GoldMart and reach customers across India. List your products for free!
          </p>
          <button
            onClick={() => onNavigate('seller')}
            className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
          >
            Start Selling Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}