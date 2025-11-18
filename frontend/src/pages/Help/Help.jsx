import { useState } from "react";

const Help = () => {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "🚀",
      articles: [
        { id: 1, title: "How to create your first product", content: "Learn how to add your first product to the marketplace..." },
        { id: 2, title: "Setting up your seller profile", content: "Complete guide to setting up your seller profile..." },
        { id: 3, title: "Understanding seller fees", content: "Detailed breakdown of all seller fees and charges..." },
      ]
    },
    {
      id: "orders",
      title: "Order Management",
      icon: "📦",
      articles: [
        { id: 4, title: "How to process orders", content: "Step-by-step guide to processing customer orders..." },
        { id: 5, title: "Shipping and fulfillment", content: "Learn about shipping options and order fulfillment..." },
        { id: 6, title: "Handling returns and refunds", content: "Guide to managing returns and processing refunds..." },
      ]
    },
    {
      id: "payments",
      title: "Payments & Payouts",
      icon: "💰",
      articles: [
        { id: 7, title: "Understanding payment cycles", content: "Learn how and when you get paid..." },
        { id: 8, title: "Tax documentation", content: "Information about tax forms and requirements..." },
        { id: 9, title: "Payment issues troubleshooting", content: "Common payment issues and solutions..." },
      ]
    },
    {
      id: "performance",
      title: "Seller Performance",
      icon: "⭐",
      articles: [
        { id: 10, title: "Maintaining good seller metrics", content: "Tips for keeping your performance metrics high..." },
        { id: 11, title: "Handling customer feedback", content: "Best practices for managing customer reviews..." },
        { id: 12, title: "Seller rating system explained", content: "Understanding how the seller rating system works..." },
      ]
    }
  ];

  const faqs = [
    {
      question: "How long does it take to get approved as a seller?",
      answer: "Typically, seller approval takes 24-48 hours after submitting all required documents."
    },
    {
      question: "What are the commission rates?",
      answer: "Commission rates vary by product category, typically ranging from 5% to 15%."
    },
    {
      question: "How do I handle customer returns?",
      answer: "You can manage returns through the Returns section in your seller dashboard."
    },
    {
      question: "When will I receive my payments?",
      answer: "Payments are processed weekly and transferred to your registered bank account."
    }
  ];

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers to common questions and get support</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Help Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.title}</span>
                  </button>
                ))}
              </div>

              {/* Contact Support */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Need more help?</h4>
                <p className="text-blue-700 text-sm mb-3">Our support team is here for you</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Articles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">{currentCategory?.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{currentCategory?.title}</h2>
              </div>
              
              <div className="space-y-4">
                {currentCategory?.articles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm">{article.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Support</h3>
                <p className="text-gray-600 text-sm mb-3">Speak directly with our support team</p>
                <p className="font-mono text-blue-600">+91-8404827541</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-3">Get instant help via chat</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-3">Send us your questions</p>
                <p className="text-blue-600">ramjeekumaryadav558@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;