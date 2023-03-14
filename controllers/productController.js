const { productModel, userModel, commentModel } = require('../models');
const { newComment, getComments } = require('./commentController')

function getProducts(req, res, next) {
	const name = req.query.name || '';
	const pageSize = +req.query.pagesize;
	const currentPage = +req.query.page;
	if (name) {
		Promise.all([
			productModel.find({ name: { $regex: name, $options: 'i' } })
				.limit(pageSize)
				.sort({ 'created_at': -1 })
				.populate('userId'),
			productModel.find({ name: { $regex: name, $options: 'i' } })
				.countDocuments()
		])
			.then(([products, productCount]) => res.json({ products, productCount }))
			.catch(next);
	} else {
		Promise.all([
			productModel.find({ name: { $regex: name, $options: 'i' } })
				.skip(pageSize * (currentPage - 1))
				.limit(pageSize)
				.sort({ 'created_at': -1 })
				.populate('userId'),
			productModel.find({ name: { $regex: name, $options: 'i' } })
				.countDocuments()
		])
			.then(([products, productCount]) => res.json({ products, productCount }))
			.catch(next);
	}
}

function getProductsByCategory(req, res, next) {
	// const productCategory = req.url.slice(1);
	const productCategory = req.params.category || '';
	const name = req.query.name || '';
	const pageSize = +req.query.pagesize;
	const currentPage = +req.query.page;
	// if (name) {
	Promise.all([
		productModel.find({ category: productCategory, name: { $regex: name, $options: 'i' } })
			.skip(pageSize * (currentPage - 1))
			.limit(pageSize)
			.sort({ 'created_at': -1 })
			.populate('userId'),
		productModel.find({ name: { $regex: name, $options: 'i' } })
			.countDocuments({ category: productCategory })
	])
		.then(([products, productCount]) => res.json({ products, productCount }))
		.catch(next);
	// } else {
	// 	Promise.all([
	// 		productModel.find({ name: { $regex: name, $options: 'i' } })
	// 			.skip(pageSize * (currentPage - 1))
	// 			.limit(pageSize)
	// 			.sort({ 'created_at': -1 })
	// 			.populate('userId'),
	// 		productModel.find({ name: { $regex: name, $options: 'i' } })
	// 			.countDocuments()
	// 	])
	// 		.then(([products, productCount]) => res.json({ products, productCount }))
	// 		.catch(next);
	// }
}

function getProduct(req, res, next) {
	const { productId } = req.params;

	productModel.findById(productId)
		.populate('userId')
		// .populate('comments')
		.then(product => {
			console.log(product)
			res.json(product)
		})
		.catch(next);
}

function getProductAndComments(req, res, next) {
	productModel.findById(productId).then(product => {
		getComments(product.id).then(comments => res.status(200).json(comments));
	})
}

function updateProduct(req, res, next) {
	const { productId } = req.params;

	productModel.findByIdAndUpdate(productId, req.body)
		.then(updatedProduct => res.status(200).json(updatedProduct))
		.catch(next);
}

function createProduct(req, res, next) {
	const { _id } = req.user;
	if (!req.user.isAdmin) { return; }
	const { name, description, info, imageUrl, price, quantity, category } = req.body.data;
	console.log('REQ.BODY: ', req.body)
	productModel.create({ name, description, info, imageUrl, price, quantity, category, userId: _id })
		.then(product => {
			return userModel.updateOne({ _id }, { $push: { products: product._id } });
		}).then(product => {
			console.log(product);
			res.status(200).json(product);
		})
		.catch(next);
}

// function deleteProduct(req, res, next) {
// 	const { productId } = req.params;
// 	const { _id: userId } = req.user;
// 	console.log(productId, userId)

// 	Promise.all([
// 		productModel.findOneAndDelete({ _id: productId, userId }),
// 		userModel.findOneAndUpdate({ userId }, { $pull: { products: productId } }),
// 		commentModel.deleteMany({ productId: productId }, { $in: { productId: productId } }),
// 	])
// 		.then(([deletedOne, _, __]) => {
// 			if (deletedOne) {
// 				res.status(200).json(deletedOne, { message: 'Product successfully deleted.' })
// 			} else {
// 				res.status(401).json({ message: `Not allowed!` });
// 			}
// 		})
// 		.catch(next);
// }

function deleteProduct(req, res, next) {
	const { productId } = req.params;
	const { _id: userId } = req.user;
	// console.log(productId, req.user);

	if (!req.user.isAdmin) { return; }
	Promise.all([
		productModel.findOneAndDelete({ _id: productId, userId }),
		userModel.findOneAndUpdate({ userId }, { $pull: { products: productId } })
	])
		.then(([deletedOne, _]) => {
			if (deletedOne) {
				res.status(200).json({ deletedOne, message: 'Product successfully deleted.' })
			} else {
				res.status(401).json({ message: `Not allowed!` });
			}
		})
		.catch(next);
}

// function addToFavorites(req, res, next) {
// 	const { productId } = req.params;
// 	const { _id: userId } = req.user;
// 	userModel.findByIdAndUpdate({ _id: userId }, { $addToSet: { favorites: productId } }, { new: true })
// 		.then(updatedUser => {
// 			res.status(200).json(updatedUser)
// 		})
// 		.catch(next);
// }

// function removeFromFavorites(req, res, next) {
// 	const { productId } = req.params;
// 	console.log('req.params', req.params)
// 	const { _id: userId } = req.user;
// 	console.log(productId, 'req.user ->', req.user);
// 	userModel.findByIdAndUpdate({ _id: userId }, { $pull: { favorites: productId } })
// 		.then((updatedUser) => res.status(200).json(updatedUser))
// 		.catch(next);
// }

// function getFavorites(req, res, next) {
// 	const { _id: userId } = req.user;
// 	userModel.findById({ _id: userId }).populate('favorites').populate('userId')
// 		.then(user => {
// 			console.log(user)
// 			res.status(200).json(user.favorites);
// 		})
// 		.catch(next);
// }

function like(req, res, next) {
	// const { productId } = req.params;
	// const { _id: userId } = req.user;

	// console.log('like');

	// productModel.updateOne({ _id: productId }, { $addToSet: { likes: userId } }, { new: true })
	// 	.then(() => res.status(200).json({ message: 'Liked successful!' }))
	// 	.catch(next);
}

module.exports = {
	getProducts,
	getProductsByCategory,
	createProduct,
	deleteProduct,
	updateProduct,
	getProduct,
	getProductAndComments,
	// addToFavorites,
	// removeFromFavorites,
	// getFavorites,
	like,
}
