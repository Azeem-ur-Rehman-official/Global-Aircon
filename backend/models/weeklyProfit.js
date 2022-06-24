const mongoose = require('mongoose');

const weeklyProfitSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },

  profit: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('weeklyProfit', weeklyProfitSchema);
