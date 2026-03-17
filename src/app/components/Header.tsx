import { ShoppingCart, User, Store, LogOut, Home } from 'lucide-react';

type HeaderProps = {
  isLoggedIn: boolean;
  userType: 'buyer' | 'seller';
  cartCount: number;
  onNavigate: (page: 'home' | 'catalog' | 'seller' | 'auth' | 'cart' | 'about' | 'contact') => void;
  onLogout: () => void;
};

export function Header({ isLoggedIn, userType, cartCount, onNavigate, onLogout }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Store className="w-8 h-8" />
            <span className="text-2xl font-bold">GoldMart</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-amber-100 transition flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="hover:text-amber-100 transition"
            >
              Shop
            </button>
            <button
              onClick={() => onNavigate('seller')}
              className="hover:text-amber-100 transition"
            >
              Sell
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="hover:text-amber-100 transition"
            >
              About
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="hover:text-amber-100 transition"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('cart')}
              className="relative hover:bg-amber-600 p-2 rounded-full transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button className="hover:bg-amber-600 px-4 py-2 rounded-lg transition flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{userType === 'seller' ? 'Seller' : 'Buyer'}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="hover:bg-amber-600 p-2 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="bg-white text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}