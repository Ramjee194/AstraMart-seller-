import mongoose from "mongoose";

// It's good practice to use PascalCase for model names (Vendor, Order)
const payoutSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true }, // ✅ lowercase field, correct ref
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // ✅ plural for clarity
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
});

//  Model name should be capitalized — “Payout”
export default mongoose.model("Payout", payoutSchema);
