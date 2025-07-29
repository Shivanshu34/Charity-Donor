// src/models/Donation.js
import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  donorName: { type: String },
  donorEmail: { type: String },
  anonymous: { type: Boolean, default: false },
  category: {
    type: String,
    enum: ['Animal Protection','Education','Child Support','Anti Drugs'],
    required: true
  },
  amount: { type: Number, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now }, 
  isPublic: { type: Boolean, default: false }  // Admin toggles visibility
});

export default mongoose.model('Donation', DonationSchema);
