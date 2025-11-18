import { useState, useEffect } from "react";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data
    setInventory([
      { 
        id: 1, 
        name: "Wireless Earbuds", 
        sku: "WE-001", 
        stock: 45, 
        lowStockThreshold: 10, 
        cost: 1500, 
        price: 2499,
        value: 67500,
        category: "Electronics",
        supplier: "Tech Suppliers Inc.",
        lastRestocked: "2024-01-10",
        status: "active"
      },
      { 
        id: 2, 
        name: "Smart Watch", 
        sku: "SW-002", 
        stock: 23, 
        lowStockThreshold: 5, 
        cost: 1800, 
        price: 2999,
        value: 41400,
        category: "Electronics",
        supplier: "Gadget World",
        lastRestocked: "2024-01-12",
        status: "active"
      },
      { 
        id: 3, 
        name: "Phone Case", 
        sku: "PC-003", 
        stock: 0, 
        lowStockThreshold: 20, 
        cost: 100, 
        price: 299,
        value: 0,
        category: "Accessories",
        supplier: "Case Masters",
        lastRestocked: "2024-01-05",
        status: "outofstock"
      },
      { 
        id: 4, 
        name: "Bluetooth Speaker", 
        sku: "BS-004", 
        stock: 15, 
        lowStockThreshold: 10, 
        cost: 800, 
        price: 1599,
        value: 12000,
        category: "Electronics",
        supplier: "Audio Experts",
        lastRestocked: "2024-01-08",
        status: "active"
      },
      { 
        id: 5, 
        name: "USB Cable", 
        sku: "UC-005", 
        stock: 3, 
        lowStockThreshold: 15, 
        cost: 50, 
        price: 199,
        value: 150,
        category: "Accessories",
        supplier: "Cable Pro",
        lastRestocked: "2024-01-15",
        status: "lowstock"
      },
    ]);
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesFilter = !lowStockFilter || item.stock <= item.lowStockThreshold;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const lowStockItems = inventory.filter(item => item.stock <= item.lowStockThreshold).length;
  const outOfStockItems = inventory.filter(item => item.stock === 0).length;
  const totalItems = inventory.length;

  const getStockColor = (stock, threshold) => {
    if (stock === 0) return 'text-red-600 bg-red-50';
    if (stock <= threshold) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'lowstock': return 'bg-orange-100 text-orange-800';
      case 'outofstock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleUpdateStock = (item) => {
    setSelectedItem(item);
    setUpdateForm({
      stock: item.stock,
      lowStockThreshold: item.lowStockThreshold,
      cost: item.cost,
      price: item.price
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateInventory = () => {
    if (!selectedItem) return;

    const updatedItem = {
      ...selectedItem,
      ...updateForm,
      value: updateForm.stock * updateForm.cost,
      status: updateForm.stock === 0 ? 'outofstock' : 
              updateForm.stock <= updateForm.lowStockThreshold ? 'lowstock' : 'active'
    };

    setInventory(inventory.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    ));
    
    setIsUpdateModalOpen(false);
    setSelectedItem(null);
  };

  const handleQuickRestock = (itemId, quantity) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const newStock = item.stock + quantity;
        return {
          ...item,
          stock: newStock,
          value: newStock * item.cost,
          status: newStock === 0 ? 'outofstock' : 
                 newStock <= item.lowStockThreshold ? 'lowstock' : 'active',
          lastRestocked: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const calculateProfitMargin = (cost, price) => {
    return (((price - cost) / cost) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your product inventory</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inventory Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
              </div>
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{outOfStockItems}</p>
              </div>
              <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                <span className="text-2xl">❌</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLowStockFilter(!lowStockFilter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  lowStockFilter
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Show Low Stock Only
              </button>
              <span className="text-sm text-gray-500">
                {filteredInventory.length} items found
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by product name or SKU..."
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

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost & Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-lg">📱</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(item.stock, item.lowStockThreshold)}`}>
                          {item.stock} units
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleQuickRestock(item.id, 10)}
                            className="text-green-600 hover:text-green-800 text-sm"
                            title="Add 10 units"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => handleQuickRestock(item.id, 1)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            title="Add 1 unit"
                          >
                            +1
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Alert at: {item.lowStockThreshold}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div>Cost: ₹{item.cost}</div>
                        <div>Price: ₹{item.price}</div>
                        <div className="text-green-600 font-medium">
                          Margin: {calculateProfitMargin(item.cost, item.price)}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{item.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleUpdateStock(item)}
                          className="text-green-600 hover:text-green-900 font-medium"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
            <p className="text-gray-500">Try changing your filters or search terms</p>
          </div>
        )}

        {/* View Item Modal */}
        {isViewModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Inventory Details</h2>
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Product Information</h3>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {selectedItem.name}</p>
                      <p><strong>SKU:</strong> {selectedItem.sku}</p>
                      <p><strong>Category:</strong> {selectedItem.category}</p>
                      <p><strong>Supplier:</strong> {selectedItem.supplier}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Stock Information</h3>
                    <div className="space-y-2">
                      <p><strong>Current Stock:</strong> {selectedItem.stock} units</p>
                      <p><strong>Low Stock Alert:</strong> {selectedItem.lowStockThreshold} units</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                          {selectedItem.status}
                        </span>
                      </p>
                      <p><strong>Last Restocked:</strong> {selectedItem.lastRestocked}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Pricing Information</h3>
                    <div className="space-y-2">
                      <p><strong>Cost Price:</strong> ₹{selectedItem.cost}</p>
                      <p><strong>Selling Price:</strong> ₹{selectedItem.price}</p>
                      <p><strong>Profit Margin:</strong> 
                        <span className="text-green-600 font-medium ml-2">
                          {calculateProfitMargin(selectedItem.cost, selectedItem.price)}%
                        </span>
                      </p>
                      <p><strong>Total Value:</strong> ₹{selectedItem.value.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuickRestock(selectedItem.id, 10)}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Add 10 Units
                      </button>
                      <button
                        onClick={() => {
                          setIsViewModalOpen(false);
                          handleUpdateStock(selectedItem);
                        }}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Update Stock Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleUpdateStock(selectedItem);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Update Inventory
                  </button>
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Stock Modal */}
        {isUpdateModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Update Stock - {selectedItem.name}</h2>
                  <button
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Stock
                    </label>
                    <input
                      type="number"
                      value={updateForm.stock || ''}
                      onChange={(e) => setUpdateForm({...updateForm, stock: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      value={updateForm.lowStockThreshold || ''}
                      onChange={(e) => setUpdateForm({...updateForm, lowStockThreshold: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost Price (₹)
                    </label>
                    <input
                      type="number"
                      value={updateForm.cost || ''}
                      onChange={(e) => setUpdateForm({...updateForm, cost: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      value={updateForm.price || ''}
                      onChange={(e) => setUpdateForm({...updateForm, price: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={handleUpdateInventory}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Update Inventory
                  </button>
                  <button
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;