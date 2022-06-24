const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  phoneNo: {
    type: String,
    required: true,
  },

  segment: {
    type: String,
    required: [true, 'Please enter service segment'],
  },
  address: {
    type: String,
    required: [true, 'Please enter address'],
  },
  date: {
    type: Date,
  },
  estimatedTime: {
    type: String,
    required: [true, 'Please enter service time'],
    default: 0.0,
  },
  noAirconditionar: {
    type: Number,
    required: [true, 'Please enter no of air conditionars'],
  },
  conditionarType: {
    type: String,
    required: [true, 'Please select type of air conditionars'],
    enum: {
      values: [
        'Wall Mounted',
        'Casdette',
        'VRV/VRF',
        'Water Chiller',
        'Concealed/Exposed Duct',
        'Mixed Units',
        'Others',
      ],
      message: 'Please select correct category for conditionars',
    },
  },
  serviceNeeded: {
    type: String,
    required: [true, 'Please select type of services'],
    enum: {
      values: [
        'Chemical Service',
        'Basic Service',
        'Water Leak Service',
        'Professional Diagnostic Service',
        'Installation Services',
        'Supply New Aircon',
        'Mix Services',
      ],
      message: 'Please select correct category for service',
    },
  },
  channels: {
    type: String,
    required: [true, 'Please select channel catagory'],
    enum: {
      values: [
        'Google',
        'Facebook',
        'Friends Recomended',
        'Newspaper',

        'Broshure',
        'Others',
      ],
      message: 'Please select correct channel category ',
    },
  },
  comment: {
    type: String,
    required: [true, 'Please enter comment'],
  },
});

module.exports = mongoose.model('ServiceCleaning', serviceSchema);
