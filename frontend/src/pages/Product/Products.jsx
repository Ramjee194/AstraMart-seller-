import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data
    setProducts([
      { id: 1, name: "Wireless Earbuds", price: 2499, stock: 45, status: "active", sales: 125, category: "Electronics" },
      { id: 2, name: "Smart Watch", price: 2999, stock: 23, status: "active", sales: 89, category: "Electronics" },
      { id: 3, name: "Phone Case", price: 299, stock: 0, status: "outofstock", sales: 234, category: "Accessories" },
      { id: 4, name: "Bluetooth Speaker", price: 1599, stock: 15, status: "active", sales: 67, category: "Electronics" },
    ]);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === "all" || product.status === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'outofstock': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 10) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <Link
            to="/products/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add Product</span>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-2">
              {['all', 'active', 'outofstock', 'inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src="https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/25776414/2024/5/24/5bf8e080-99f0-440d-a27f-17797de64be01716533533461-NOISE-Aura-Buds-Truly-Wireless-Earbuds-with-60H-Playtime-and-1.jpg"
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{product.category}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  <span className={`text-sm font-medium ${getStockColor(product.stock)}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Sales: {product.sales}</span>
                  <span>ID: #{product.id}</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-center hover:bg-gray-200 transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try changing your filters or search terms</p>
            <Link
              to="/products/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Add Your First Product</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;