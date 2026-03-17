import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { CartItem } from '../App';

type CartProps = {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onBack: () => void;
  isLoggedIn: boolean;
  onNavigateToAuth: () => void;
};

export function Cart({ items, onUpdateQuantity, onBack, isLoggedIn, onNavigateToAuth }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 20000 ? 0 : 500;
  const tax = subtotal * 0.03; // 3% GST
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-xl text-gray-600 mb-8">Add some beautiful gold jewellery to your cart!</p>
        <button
          onClick={onBack}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Continue Shopping
      </button>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 flex gap-6">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.seller}</p>
                  </div>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 0)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-semibold">
                    {item.purity}
                  </span>
                  <span className="text-sm text-gray-600">{item.weight}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white rounded-lg transition"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white rounded-lg transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-600">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-500">₹{item.price.toLocaleString()} each</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${shipping.toLocaleString()}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (3%)</span>
                <span className="font-semibold">₹{tax.toLocaleString()}</span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-amber-600">
                  Add ₹{(20000 - subtotal).toLocaleString()} more for free shipping!
                </p>
              )}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-amber-600">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {isLoggedIn ? (
              <>
                <button className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition mb-3">
                  Proceed to Checkout
                </button>
                <button
                  onClick={onBack}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Continue Shopping
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onNavigateToAuth}
                  className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition mb-3"
                >
                  Login to Checkout
                </button>
                <p className="text-sm text-center text-gray-600">
                  Please login to proceed with your purchase
                </p>
              </>
            )}

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">We Accept</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-gray-100 rounded p-2 text-center text-xs font-semibold">VISA</div>
                <div className="bg-gray-100 rounded p-2 text-center text-xs font-semibold">MC</div>
                <div className="bg-gray-100 rounded p-2 text-center text-xs font-semibold">UPI</div>
                <div className="bg-gray-100 rounded p-2 text-center text-xs font-semibold">NET</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">Security</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>🔒</span>
                <span>Secure SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <span>✓</span>
                <span>100% Purchase Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
