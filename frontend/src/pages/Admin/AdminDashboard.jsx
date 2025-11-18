import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../../store/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded">Total Vendors: {stats.totalVendors}</div>
        <div className="p-6 bg-white shadow rounded">Total Products: {stats.totalProducts}</div>
        <div className="p-6 bg-white shadow rounded">Total Orders: {stats.totalOrders}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
