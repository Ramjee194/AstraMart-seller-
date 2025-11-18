import { useState, useEffect } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Mock data
    setMetrics({
      salesData: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      revenueData: [45000, 52000, 48000, 62000, 58000, 75000, 70000],
      topProducts: [
        { name: "Wireless Earbuds", revenue: 125000 },
        { name: "Smart Watch", revenue: 98000 },
        { name: "Phone Case", revenue: 45000 },
      ],
      trafficSources: [
        { source: "Direct", percentage: 40 },
        { source: "Amazon", percentage: 30 },
        { source: "Flipkart", percentage: 20 },
        { source: "Other", percentage: 10 },
      ]
    });
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track your business performance</p>
          </div>
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₹2,45,678</p>
            <p className="text-sm text-green-600">+12.5% from last period</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-green-600">+8.2% from last period</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Average Order Value</p>
            <p className="text-2xl font-bold text-gray-900">₹1,989</p>
            <p className="text-sm text-green-600">+4.7% from last period</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900">3.2%</p>
            <p className="text-sm text-red-600">-0.5% from last period</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-600">Sales chart will appear here</p>
                <p className="text-sm text-gray-500">Integrated with charting library</p>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <p className="text-gray-600">Revenue chart will appear here</p>
                <p className="text-sm text-gray-500">Integrated with charting library</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
            <div className="space-y-4">
              {metrics.topProducts?.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">₹{product.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              {metrics.trafficSources?.map((source, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{source.source}</span>
                    <span className="font-medium text-gray-900">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Customer Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>New Customers</span>
                <span className="font-medium">234</span>
              </div>
              <div className="flex justify-between">
                <span>Returning Customers</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Satisfaction</span>
                <span className="font-medium">4.8/5</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Inventory Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Stock Turnover</span>
                <span className="font-medium">2.3x</span>
              </div>
              <div className="flex justify-between">
                <span>Low Stock Items</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Out of Stock</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Order Fulfillment Time</span>
                <span className="font-medium">2.1 days</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time</span>
                <span className="font-medium">4.2 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Seller Rating</span>
                <span className="font-medium">4.7/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;