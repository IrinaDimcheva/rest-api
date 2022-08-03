const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const orderSchema = new Schema({
  address: {
    fullName: {
      type: String,
      required: true
    },

  },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
