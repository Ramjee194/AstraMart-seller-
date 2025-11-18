import Vendor from "../models/Vendor.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const listVendors =async (req,res)=>{
    const vendor = await Vendor.find().populate('user','name email');
    res.json(vendor);
}

export const approveVendor =async (req,res)=>{
    const vendor = await Vendor.findById(req.params.id);
    if(!vendor){
        return res.status(404).json({message:"Vendor not found"});
        vendor.kycStatus=req.body.action==='approve' ? 'verified' : 'rejected';
        await vendor.save();
        res.json(vendor);

    }

};

export const platformStats =async(req,res)=>{
    const totalVendors= await Vendor.count();
    const totalProducts= await Product.count();
    const totalOrders=await Order.count();
    const revenue = await Order.aggregate([{
        $group:{_id:null,total:{$sum:'$totalAmount'},commission:{$sum:'$commission'}}
    }]);
    res.json({
        totalVendors,
        totalProducts,
        totalOrders,revenue: revenue[0] || {} })
};
