import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorDashboard } from "../../store/vendorSlice";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector((s) => s.vendor);

  useEffect(() => {
    dispatch(fetchVendorDashboard());
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="p-6 bg-white shadow rounded text-center">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">
            ₹{dashboard.metrics.totalRevenue}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded text-center">
          <h2 className="text-lg">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600">
            {dashboard.metrics.totalOrders}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded text-center">
          <h2 className="text-lg">Products Listed</h2>
          <p className="text-2xl font-bold text-purple-600">
            {dashboard.metrics.productsCount}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded text-center">
          <h2 className="text-lg">Pending Orders</h2>
          <p className="text-2xl font-bold text-orange-600">
            {dashboard.metrics.pendingOrders}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 flex gap-4">
        <Link to="/vendor/add-product" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</Link>
        <Link to="/vendor/products" className="bg-gray-800 text-white px-4 py-2 rounded">Manage Products</Link>
        <Link to="/vendor/orders" className="bg-green-600 text-white px-4 py-2 rounded">Orders</Link>
        <Link to="/vendor/payouts" className="bg-purple-600 text-white px-4 py-2 rounded">Payouts</Link>
      </div>
    </div>
  );
};

export default VendorDashboard;
