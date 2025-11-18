import Vendor from '../models/Vendor.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

//   Get Vendor Profile
export const getMyVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor
      .findOne({ user: req.user._id })
      .populate('user', 'name email');

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    return res.json(vendor);

  } catch (error) {
    console.error('Vendor Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Submit KYC
export const submitKyc = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // You can save uploaded files here (Aadhar, PAN, etc.)
    const files = req.files; // If using multer

    vendor.kycStatus = 'pending';
    vendor.kycFiles = files || [];   // optional
    await vendor.save();

    res.json({ message: 'KYC submitted successfully' });

  } catch (error) {
    console.error('KYC Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Vendor Dashboard
export const vendorDashboard = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const products = await Product.find({ vendor: vendor._id }).lean();
    const orders = await Order.find({ vendor: vendor._id })
      .sort('-createdAt')
      .limit(20)
      .lean();

    //  Calculate revenue
    const totalRevenue = orders.reduce(
      (total, order) => total + (order.totalAmount || 0),
      0
    );

    res.json({
      vendor,
      metrics: {
        totalRevenue,
        productsCount: products.length,
        recentOrders: orders
      }
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
