// models/Inventory.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  lowStockThreshold: {
    type: Number,
    required: true,
    default: 10
  },
  cost: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
  supplier: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'lowstock', 'outofstock'],
    default: 'active'
  },
  lastRestocked: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-calculate value before saving
inventorySchema.pre('save', function(next) {
  this.value = this.stock * this.cost;
  next();
});

export default  mongoose.model('Inventory', inventorySchema);