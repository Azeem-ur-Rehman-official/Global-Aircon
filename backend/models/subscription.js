const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  duration: {
    type: Number,
  },
  price: {
    type: Number,
    required: [true, 'Please enter Subscription price'],
    maxLength: [5, 'Subscription name cannot exceed 5 characters'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Please enter Subscription description'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
