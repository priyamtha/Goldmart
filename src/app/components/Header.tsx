import { ShoppingCart, User, Store, LogOut, Home, Mail, Phone, MapPin } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type HeaderProps = {
  isLoggedIn: boolean;
  userType: 'buyer' | 'seller';
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  cartCount: number;
  onNavigate: (page: 'home' | 'catalog' | 'seller' | 'auth' | 'cart' | 'about' | 'contact') => void;
  onLogout: () => void;
};

export function Header({ isLoggedIn, userType, userName, userEmail, userPhone, cartCount, onNavigate, onLogout }: HeaderProps) {
  // Mock user data structured based on userType
  const mockUser = {
    name: userName || (userType === 'seller' ? 'Gold Vendor Inc.' : 'John Doe'),
    email: userEmail || (userType === 'seller' ? 'vendor@goldmart.com' : 'john.doe@example.com'),
    phone: userPhone || '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: 'Jan 2024',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

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
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="hover:bg-amber-600 px-4 py-2 rounded-lg transition flex items-center gap-2 cursor-pointer">
                      <User className="w-5 h-5" />
                      <span className="hidden sm:inline">{mockUser.name}</span>
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-white text-gray-800 shadow-xl border-amber-200">
                    <div className="flex justify-between space-x-4">
                      <Avatar className="w-12 h-12 border-2 border-amber-500">
                        <AvatarImage src={mockUser.avatar} />
                        <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">{mockUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-semibold">{mockUser.name}</h4>
                        <p className="text-sm border-b pb-2 mb-2 text-amber-600 font-medium">
                          {userType === 'seller' ? 'Verified Seller' : 'Premium Buyer'}
                        </p>
                        <div className="flex items-center pt-2 text-xs text-slate-500">
                          <Mail className="w-3 h-3 mr-2 text-amber-500" />
                          {mockUser.email}
                        </div>
                        <div className="flex items-center pt-1 text-xs text-slate-500">
                          <Phone className="w-3 h-3 mr-2 text-amber-500" />
                          {mockUser.phone}
                        </div>
                        <div className="flex items-center pt-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3 mr-2 text-amber-500" />
                          {mockUser.location}
                        </div>
                        <div className="text-xs text-slate-400 pt-2 mt-2 border-t">
                          Member since {mockUser.joinDate}
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
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