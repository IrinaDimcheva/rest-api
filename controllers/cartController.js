// const cartModel = require('../models/cartModel');

// function getCart(req, res, next) {
//   const { _id } = req.user;
//   userModel.findById(_id).populate('cart')
//     .then(user => {
//       // user.cart.reduce((acc, curr) => acc + +curr.price, 0);
//       res.status(200).json(user.cart);
//     })
//     .catch(next);
// }

// async function addToCart(req, res, next) {
//   // const { productId, quantity } = req.body;
//   const { _id } = req.user;
//   const cartExists = await cartModel.findOne({ _id });
//   userModel.findByIdAndUpdate(_id, { $push: { cart: productId } })
//     .then(() => {
//       res.status(200).json({ message: 'Product successfully added to cart.' })
//     })
//     .catch(next);
// }

// function removeFromCart(req, res, next) {
//   const { productId } = req.body;
//   const { _id } = req.user;
//   userModel.findOneAndUpdate(_id, { $pull: { cart: productId } })
//     .then(() => {
//       res.status(200).json({ message: 'Product successfully removed from cart.' })
//     })
//     .catch(next);
// }

// module.exports = {
//   getCart,
//   addToCart,
//   removeFromCart
// }