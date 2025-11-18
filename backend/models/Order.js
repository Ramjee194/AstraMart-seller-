import mongoose from "mongoose";
import Vendor from "./Vendor.js";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number },
  price: { type: Number },
});

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  items: [orderItemSchema],
  totalAmount: { type: Number },
  commission: { type: Number },
  payoutAmount: { type: Number },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing',
  },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
