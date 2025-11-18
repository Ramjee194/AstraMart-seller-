import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SellerNavbar from "../../components/Navbar";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const features = [
    {
      icon: "📊",
      title: "Dashboard Analytics",
      description: "Get real-time insights into your sales, orders, and customer behavior with comprehensive analytics."
    },
    {
      icon: "📦",
      title: "Order Management",
      description: "Easily manage orders, track shipments, and handle returns from a single dashboard."
    },
    {
      icon: "🛍️",
      title: "Product Catalog",
      description: "Add, edit, and manage your product listings with bulk operations and inventory tracking."
    },
    {
      icon: "💰",
      title: "Payment Tracking",
      description: "Monitor your earnings, track payouts, and manage financial reports seamlessly."
    },
    {
      icon: "📈",
      title: "Performance Metrics",
      description: "Track your seller performance, customer ratings, and marketplace standing."
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Stay updated with real-time alerts for orders, low stock, and important updates."
    }
  ];

  const stats = [
    { number: "10,0000+", label: "Active Sellers" },
    { number: "₹50000Cr+", label: "Monthly GMV" },
    { number: "95%", label: "Seller Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  const steps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your seller account in minutes",
      icon: "👤"
    },
    {
      step: "2",
      title: "Add Products",
      description: "List your products with easy bulk upload",
      icon: "📝"
    },
    {
      step: "3",
      title: "Start Selling",
      description: "Receive orders and manage your business",
      icon: "🚀"
    },
    {
      step: "4",
      title: "Grow Business",
      description: "Use analytics to scale your operations",
      icon: "📈"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Only show SellerNavbar if user is logged in */}
      {user && <SellerNavbar />}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Grow Your Business with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}AstraMart
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The all-in-one platform for modern sellers. Manage orders, track inventory, 
              and grow your business with powerful analytics tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg"
                  >
                    Start Selling Free
                  </Link>
                  <Link
                    to="/login"
                    className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-white transition-all font-semibold text-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mock Dashboard Preview */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Sales</span>
                    <span>📈</span>
                  </div>
                  <p className="text-2xl font-bold">₹2,45,678</p>
                  <p className="text-blue-100 text-sm">+12.5% this month</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Orders</span>
                    <span>📦</span>
                  </div>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-green-100 text-sm">+8.2% this month</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Products</span>
                    <span>🛍️</span>
                  </div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-orange-100 text-sm">Active listings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools and features designed to help you manage and grow your online business efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Selling in 4 Easy Steps
            </h2>
            <p className="text-xl text-gray-600">
              Get your business up and running in no time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200 -z-10"></div>
                )}
                
                <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful sellers who trust AstraMart to power their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg"
                >
                  Start Free Today
                </Link>
                <Link
                  to="/login"
                  className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all font-semibold text-lg"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
          <p className="text-blue-200 mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <img
                  src="https://res.cloudinary.com/dxju8ikk4/image/upload/v1763417893/astramart-logo.png_ctutiw.jpg"
                  alt="AstraMart Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
                </div>
                <span className="text-xl font-bold">AstraMart</span>
              </div>
              <p className="text-gray-400">
                Empowering sellers with powerful tools to grow their business online.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AstraMart. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;