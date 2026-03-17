import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { SellerDashboard } from './components/SellerDashboard';
import { AuthPage } from './components/AuthPage';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  weight: string;
  purity: string;
  image: string;
  seller: string;
  description: string;
  rating: number;
  reviews: number;
};

export type CartItem = Product & {
  quantity: number;
};

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'detail' | 'seller' | 'auth' | 'cart' | 'about' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [userType, setUserType] = useState<'buyer' | 'seller'>(() => (localStorage.getItem('userType') as 'buyer' | 'seller') || 'buyer');
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState<string>(() => localStorage.getItem('userEmail') || '');
  const [userPhone, setUserPhone] = useState<string>(() => localStorage.getItem('userPhone') || '');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('userType', userType);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userPhone', userPhone);
  }, [isLoggedIn, userType, userName, userEmail, userPhone]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
  };

  const handleLogin = (type: 'buyer' | 'seller', name: string, email: string, phone: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserName(name);
    setUserEmail(email);
    setUserPhone(phone);
    setCurrentPage('home');
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('catalog');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        userType={userType}
        userName={userName}
        userEmail={userEmail}
        userPhone={userPhone}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onNavigate={setCurrentPage}
        onLogout={() => {
          setIsLoggedIn(false);
          setUserName('');
          setUserEmail('');
          setUserPhone('');
          setCurrentPage('home');
        }}
      />

      {currentPage === 'home' && (
        <HomePage
          onNavigate={setCurrentPage}
          onViewProduct={handleViewProduct}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {currentPage === 'catalog' && (
        <ProductCatalog
          onViewProduct={handleViewProduct}
          selectedCategory={selectedCategory}
        />
      )}

      {currentPage === 'detail' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setCurrentPage('catalog')}
          onAddToCart={handleAddToCart}
          isLoggedIn={isLoggedIn}
        />
      )}

      {currentPage === 'seller' && (
        <SellerDashboard
          isLoggedIn={isLoggedIn}
          onNavigateToAuth={() => setCurrentPage('auth')}
        />
      )}

      {currentPage === 'auth' && (
        <AuthPage
          onLogin={handleLogin}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'cart' && (
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onBack={() => setCurrentPage('catalog')}
          isLoggedIn={isLoggedIn}
          onNavigateToAuth={() => setCurrentPage('auth')}
        />
      )}

      {currentPage === 'about' && <AboutPage onBack={() => setCurrentPage('home')} />}

      {currentPage === 'contact' && <ContactPage onBack={() => setCurrentPage('home')} />}
    </div>
  );
}

export default App;