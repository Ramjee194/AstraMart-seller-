// controllers/order.controller.js
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Vendor from "../models/Vendor.js";
import payout from '../models/Payout.js'
import { createPaymentIntent } from "../services/stripe.service.js";

const COMMISSION_PERCENT = parseFloat(process.env.PLATFORM_COMMISSION_PERCENT) || 10;

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items in the order" });

    // Calculate total amount
    let total = 0;
    const lineItems = [];
    let vendorId = null;

    for (const it of items) {
      const prod = await Product.findById(it.productId);
      if (!prod) return res.status(400).json({ message: "Invalid product" });
      vendorId = prod.vendor;
      const price = prod.price;
      lineItems.push({ product: prod._id, quantity: it.quantity, price });
      total += price * it.quantity;
    }

    const commission = (total * COMMISSION_PERCENT) / 100;
    const payoutAmount = total - commission;

    // Create PaymentIntent
    const paymentIntent = await createPaymentIntent(total, "inr", { purpose: "order" });

    const order = new Order({
      customer: req.user._id,
      vendor: vendorId,
      items: lineItems,
      totalAmount: total,
      commission,
      payoutAmount,
      paymentStatus: "pending",
      orderStatus: "placed",
      transactionId: paymentIntent.id,
    });

    await order.save();
    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Stripe webhook handler
export const webhookHandler = async (req, res) => {
  res.status(200).json({ ok: true });
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;
    await order.save();

    // If delivered, trigger payout & vendor stats update
    if (status === "delivered") {
      const productIds = order.items.map((i) => i.product);

      await Product.updateMany(
        { _id: { $in: productIds } },
        { $inc: { totalSales: 1 } }
      );

      const vendor = await Vendor.findById(order.vendor);
      vendor.earnings = (vendor.earnings || 0) + order.payoutAmount;
      vendor.totalOrders = (vendor.totalOrders || 0) + 1;
      await vendor.save();

      // Optionally trigger payout
      // await payout(vendor, order.payoutAmount);
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
