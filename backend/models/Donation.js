const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'pieces', 'liters', 'ml']
  },
  expiryDate: {
    type: Date,
    required: true
  },
  pickupAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'collected', 'distributed', 'cancelled'],
    default: 'pending'
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['perishable', 'non-perishable', 'beverages', 'snacks', 'other']
  },
  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  collectedAt: Date,
  distributedTo: {
    type: String,
    trim: true
  },
  distributedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
donationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Donation', donationSchema); 