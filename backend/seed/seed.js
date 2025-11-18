// seed/seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import Product from "../models/Product.js";

dotenv.config();

(async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Vendor.deleteMany({});
    await Product.deleteMany({});

    const admin = new User({
      name: "Admin",
      email: "ramjeekumaryadav558@gmail.com",
      password: "Admin@123",
      role: "admin",
    });
    await admin.save();

    const vendorUser = new User({
      name: "Vendor One",
      email: "ramjeekumaryadav558@gmail.com",
      password: "RaMjee@1",
      role: "vendor",
    });
    await vendorUser.save();

    const vendor = new Vendor({
      user: vendorUser._id,
      businessName: "Vendor One Shop",
      kycStatus: "verified",
    });
    await vendor.save();

    const p1 = new Product({
      vendor: vendor._id,
      title: "Sample Perfume",
      description: "Nice fragrance",
      price: 799,
      category: "Beauty",
      stock: 50,
    });
    await p1.save();

    console.log("Seed complete.");
    process.exit(0);
  } catch (err) {
    console.error(" Seed error:", err);
    process.exit(1);
  }
})();
