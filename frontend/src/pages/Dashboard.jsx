import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        // Mock data - replace with actual API calls
        setStats({
            totalSales: 1245,
            totalOrders: 89,
            totalProducts: 45,
            totalRevenue: 125600
        });

        setRecentOrders([
            { id: 1, customer: "Ramjee kumar yadav", amount: 2499, status: "Delivered", date: "2025-11-15" },
            { id: 2, customer: "Shamshul Ansari", amount: 1599, status: "Shipped", date: "2025-11-14" },
            { id: 3, customer: "Dhiraj Dhoni", amount: 3299, status: "Processing", date: "2025-11-14" },
            { id: 4, customer: "Piyush mishra", amount: 3299, status: "Processing", date: "2025-11-14" },

        ]);

        setTopProducts([
            { id: 1, name: "Wireless Earbuds", sales: 45, revenue: 112455 },
            { id: 2, name: "Smart Watch", sales: 32, revenue: 95968 },
            { id: 3, name: "Phone Case", sales: 78, revenue: 23322 }
        ]);
    }, []);

    const StatCard = ({ title, value, change, icon, color }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {change && (
                        <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Download Report
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Sales"
                        value={stats.totalSales.toLocaleString()}
                        change={12.5}
                        icon="💰"
                        color="bg-green-100 text-green-600"
                    />
                    <StatCard
                        title="Total Orders"
                        value={stats.totalOrders}
                        change={8.2}
                        icon="📦"
                        color="bg-blue-100 text-blue-600"
                    />
                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts}
                        change={5.7}
                        icon="🛍️"
                        color="bg-purple-100 text-purple-600"
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`₹${stats.totalRevenue.toLocaleString()}`}
                        change={15.3}
                        icon="📈"
                        color="bg-orange-100 text-orange-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                            <Link to="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{order.customer}</p>
                                        <p className="text-sm text-gray-500">Order #{order.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">₹{order.amount}</p>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                            <Link to="/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {topProducts.map((product) => (
                                <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-lg">📱</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.sales} units sold</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                                        <p className="text-sm text-green-600">+15%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/products/add" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">➕</div>
                            <p className="font-medium text-gray-900">Add Product</p>
                        </Link>
                        <Link to="/orders" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">📦</div>
                            <p className="font-medium text-gray-900">Manage Orders</p>
                        </Link>
                        <Link to="/analytics" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">📊</div>
                            <p className="font-medium text-gray-900">View Reports</p>
                        </Link>
                        <Link to="/inventory" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">📋</div>
                            <p className="font-medium text-gray-900">Check Inventory</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;