const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
