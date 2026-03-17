import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Phone, Package } from 'lucide-react';

type AuthPageProps = {
  onLogin: (userType: 'buyer' | 'seller', name: string, email: string, phone: string) => void;
  onBack: () => void;
};

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Read registered users
    let registeredUsers: any[] = [];
    try {
      const saved = localStorage.getItem('registeredUsers');
      if (saved) registeredUsers = JSON.parse(saved);
    } catch {}

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Check if user already exists
      if (registeredUsers.find(u => u.email === formData.email)) {
        alert("An account with this email already exists!");
        return;
      }
      
      const newUser = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone || '',
        password: formData.password,
        userType: userType
      };
      
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      onLogin(userType, newUser.name, newUser.email, newUser.phone);
    } else {
      // Login matching
      const user = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        // Log them in using stored info
        onLogin(user.userType || userType, user.name, user.email, user.phone);
      } else {
        alert("Invalid email or password.");
      }
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook', account?: { name: string, email: string }) => {
    if (provider === 'google' && !account) {
      setShowGooglePicker(true);
      return;
    }
    
    if (provider === 'google' && account) {
      onLogin(userType, account.name, account.email, '');
    } else {
      const name = 'Facebook User';
      const email = 'facebook.user@example.com';
      onLogin(userType, name, email, '');
    }
  };

  const mockGoogleAccounts = [
    { name: 'Alice Smith', email: 'alice.smith@gmail.com', avatar: 'A' },
    { name: 'Bob Jones', email: 'bjones99@gmail.com', avatar: 'B' },
    { name: 'GoldMart Dev', email: 'dev@goldmart.com', avatar: 'G' },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-amber-50 to-yellow-100 py-12">
      <div className="max-w-md mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {isLogin ? 'Login to your account' : 'Join GoldMart today'}
          </p>

          {/* User Type Selection (Only for Login) */}
          {isLogin && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  userType === 'buyer'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  userType === 'seller'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Seller
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Your Role</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setUserType('buyer')}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition flex justify-center items-center gap-2 ${
                        userType === 'buyer'
                          ? 'border-amber-600 bg-amber-50 text-amber-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <User className="w-5 h-5" />
                      Buyer
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('seller')}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition flex justify-center items-center gap-2 ${
                        userType === 'seller'
                          ? 'border-amber-600 bg-amber-50 text-amber-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      Seller
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                    placeholder="Enter your phone number"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2 accent-amber-600" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Account Picker Modal */}
      {showGooglePicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-2">Choose an account</h3>
            <p className="text-sm text-gray-500 mb-6">to continue to GoldMart</p>
            
            <div className="space-y-3">
              {mockGoogleAccounts.map((account, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSocialLogin('google', account)}
                  className="w-full flex items-center p-3 hover:bg-gray-50 border border-gray-100 rounded-lg transition text-left gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {account.avatar}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-semibold text-gray-900 truncate">{account.name}</div>
                    <div className="text-sm text-gray-500 truncate">{account.email}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowGooglePicker(false)}
              className="mt-6 w-full py-2 text-gray-600 hover:text-gray-900 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
