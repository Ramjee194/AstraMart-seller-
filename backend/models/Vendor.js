import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bussinessName: {
    type: String,
    required: true
  },
  gstNumber: {
    type: String
  },
  panNumber: { type: String },
  bankDetails: {
    accountNumber: { type: String },
    accountName: { type: String },
    ifsc: String
  },
  documents: [{ url: String, key: String }], // fixed spelling
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Vendor', vendorSchema);
