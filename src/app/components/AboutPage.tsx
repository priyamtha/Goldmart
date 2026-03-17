import { ArrowLeft, Award, Shield, Users, TrendingUp, Heart, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type AboutPageProps = {
  onBack: () => void;
};

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-amber-100 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-5xl font-bold mb-6">About GoldMart</h1>
          <p className="text-xl max-w-3xl">
            India's most trusted online platform connecting gold jewelry buyers and sellers. 
            We're on a mission to make gold jewelry trading transparent, secure, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At GoldMart, we believe everyone deserves access to authentic, high-quality gold jewelry 
                at fair prices. We're revolutionizing the traditional gold jewelry market by bringing 
                transparency, trust, and technology together.
              </p>
              <p className="text-lg text-gray-700">
                Our platform empowers sellers to reach a wider audience while providing buyers with 
                an extensive collection of verified, certified gold jewelry from trusted sellers across India.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBqZXdlbHJ5fGVufDF8fHx8MTc3MzAyNjY0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gold jewelry"
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629587424599-ee8806a66127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXQlMjBsdXh1cnl8ZW58MXx8fHwxNzczMDAwODMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gold bracelet"
                className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719559746390-57f3af2794ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwcmluZyUyMGRpYW1vbmR8ZW58MXx8fHwxNzczMDI5MjMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gold ring"
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
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Authenticity</h3>
              <p className="text-gray-600">
                Every piece of jewelry on our platform is verified and certified. We ensure 100% 
                authenticity with BIS hallmark certification.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We provide exceptional service, secure transactions, 
                and hassle-free returns.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-gray-600">
                Fair pricing based on live gold rates with no hidden charges. What you see is what you pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">GoldMart in Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">50K+</div>
              <p className="text-xl text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">2,500+</div>
              <p className="text-xl text-gray-600">Verified Sellers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">15K+</div>
              <p className="text-xl text-gray-600">Products Listed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">₹100Cr+</div>
              <p className="text-xl text-gray-600">Transaction Value</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose GoldMart?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">BIS Certified Products</h3>
                <p className="text-gray-600">All jewelry comes with official BIS hallmark certification ensuring purity and quality.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Verified Sellers</h3>
                <p className="text-gray-600">Every seller undergoes a thorough verification process before joining our platform.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
                <p className="text-gray-600">Multiple payment options with bank-grade security and encryption.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
                <p className="text-gray-600">7-day return policy with full refund on unused products.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free insured shipping on all orders with real-time tracking.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Live Gold Rates</h3>
                <p className="text-gray-600">Transparent pricing based on current market rates updated daily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A passionate group of professionals dedicated to revolutionizing the gold jewelry industry in India.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { role: 'Founders', count: '4', icon: Users },
              { role: 'Developers', count: '15', icon: TrendingUp },
              { role: 'Support Team', count: '25', icon: Heart },
              { role: 'Quality Experts', count: '12', icon: Award },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <item.icon className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{item.count}</div>
                <p className="text-gray-600">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
