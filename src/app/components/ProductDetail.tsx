import { ArrowLeft, ShoppingCart, Star, Shield, Award, Truck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';
import { useState } from 'react';

type ProductDetailProps = {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
};

export function ProductDetail({ product, onBack, onAddToCart, isLoggedIn }: ProductDetailProps) {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-amber-500 transition">
                <ImageWithFallback
                  src={product.image}
                  alt={`${product.name} view ${i}`}
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="font-semibold ml-2">{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-1">Price</p>
                <p className="text-4xl font-bold text-amber-600">₹{product.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 mb-1">Purity</p>
                <p className="text-2xl font-bold text-gray-900">{product.purity}</p>
              </div>
            </div>
          </div>

          {/* Product Specs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Weight</p>
              <p className="font-semibold text-lg">{product.weight}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Seller</p>
              <p className="font-semibold text-lg">{product.seller}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}. This exquisite piece is crafted with precision and care, 
              ensuring the highest quality standards. Perfect for special occasions or as a timeless 
              addition to your jewelry collection.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Certified</p>
              <p className="text-xs text-gray-600">100% Authentic</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Quality</p>
              <p className="text-xs text-gray-600">BIS Hallmark</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Truck className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Delivery</p>
              <p className="text-xs text-gray-600">Free Shipping</p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="space-y-3">
            {addedToCart && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-3 text-center font-semibold">
                ✓ Added to cart successfully!
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={!isLoggedIn}
              className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              {isLoggedIn ? 'Add to Cart' : 'Login to Add to Cart'}
            </button>
            {!isLoggedIn && (
              <p className="text-sm text-center text-gray-600">
                Please login to purchase this product
              </p>
            )}
            <button className="w-full bg-white border-2 border-amber-600 text-amber-600 py-4 rounded-lg font-semibold hover:bg-amber-50 transition">
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-lg mb-3">Product Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Material:</span>
              <span className="font-semibold">Gold {product.purity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="font-semibold">{product.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-semibold">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hallmark:</span>
              <span className="font-semibold">BIS Certified</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-lg mb-3">Shipping Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Time:</span>
              <span className="font-semibold">3-5 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Cost:</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance:</span>
              <span className="font-semibold">Included</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tracking:</span>
              <span className="font-semibold">Available</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-lg mb-3">Return Policy</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Return Period:</span>
              <span className="font-semibold">7 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Condition:</span>
              <span className="font-semibold">Unused</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Refund:</span>
              <span className="font-semibold">Full Amount</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Exchange:</span>
              <span className="font-semibold">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}