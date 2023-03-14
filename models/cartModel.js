const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);


// const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema.Types;

// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: ObjectId,
//     ref: 'User'
//   },
//   cartItems: [{
//     productId: {
//       type: ObjectId,
//       required: true,
//       ref: 'Product'
//     },
//     quantity: {
//       type: Number,
//       default: 1
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0
//     }
//   }]
// });

// module.exports = mongoose.model('Cart', cartSchema);