const { postModel, userModel, commentModel } = require('../models');
const { newComment, getComments } = require('./commentController')

function getPosts(req, res, next) {
	const title = req.query.title || '';
	const pageSize = +req.query.pagesize;
	const currentPage = +req.query.page;
	if (title) {
		Promise.all([
			postModel.find({ title: { $regex: title, $options: 'i' } })
				.limit(pageSize)
				.sort({ 'created_at': -1 })
				.populate('userId'),
			postModel.find({ title: { $regex: title, $options: 'i' } })
				.countDocuments()
		])
			.then(([posts, postCount]) => res.json({ posts, postCount }))
			.catch(next);
	} else {
		Promise.all([
			postModel.find({ title: { $regex: title, $options: 'i' } })
				.skip(pageSize * (currentPage - 1))
				.limit(pageSize)
				.sort({ 'created_at': -1 })
				.populate('userId'),
			postModel.find({ title: { $regex: title, $options: 'i' } })
				.countDocuments()
		])
			.then(([posts, postCount]) => res.json({ posts, postCount }))
			.catch(next);
	}
}

function getPost(req, res, next) {
	const { postId } = req.params;

	postModel.findById(postId)
		.populate('userId')
		.populate('comments')
		.then(post => {
			console.log(post)
			res.json(post)
		})
		.catch(next);
}

function getPostAndComments(req, res, next) {
	postModel.findById(postId).then(post => {
		getComments(post.id).then(comments => res.status(200).json(comments));
	})
}

function updatePost(req, res, next) {
	const { postId } = req.params;

	postModel.findByIdAndUpdate(postId, req.body)
		.then(updatedPost => res.status(200).json(updatedPost))
		.catch(next);
}

function createPost(req, res, next) {
	const { _id: userId } = req.user;
	const { title, content, imageUrl, tag } = req.body;
	postModel.create({ title, content, imageUrl, tag, userId })
		.then(post => {
			return userModel.updateOne({ _id: userId }, { $push: { posts: post._id } });
		}).then(post => {
			console.log(post);
			res.status(200).json(post);
		})
		.catch(next);
}

function deletePost(req, res, next) {
	const { postId } = req.params;
	const { _id: userId } = req.user;

	Promise.all([
		postModel.findOneAndDelete({ _id: postId, userId }),
		userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
		commentModel.deleteMany({ postId: postId }, { $in: { postId: postId } }),
	])
		.then(([deletedOne, _, __]) => {
			if (deletedOne) {
				res.status(200).json(deletedOne)
			} else {
				res.status(401).json({ message: `Not allowed!` });
			}
		})
		.catch(next);
}

function addToFavorites(req, res, next) {
	const { postId } = req.params;
	const { _id: userId } = req.user;
	userModel.findByIdAndUpdate({ _id: userId }, { $addToSet: { favorites: postId } }, { new: true })
		.then(updatedUser => {
			res.status(200).json(updatedUser)
		})
		.catch(next);
}

function removeFromFavorites(req, res, next) {
	const { postId } = req.params;
	console.log('req.params', req.params)
	const { _id: userId } = req.user;
	console.log(postId, 'req.user ->', req.user);
	userModel.findByIdAndUpdate({ _id: userId }, { $pull: { favorites: postId } })
		.then((updatedUser) => res.status(200).json(updatedUser))
		.catch(next);
}

function getFavorites(req, res, next) {
	const { _id: userId } = req.user;
	userModel.findById({ _id: userId }).populate('favorites').populate('userId')
		.then(user => {
			console.log(user)
			res.status(200).json(user.favorites);
		})
		.catch(next);
}

function like(req, res, next) {
	const { postId } = req.params;
	const { _id: userId } = req.user;

	console.log('like');

	postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
		.then(() => res.status(200).json({ message: 'Liked successful!' }))
		.catch(next);
}

module.exports = {
	getPosts,
	createPost,
	deletePost,
	updatePost,
	getPost,
	getPostAndComments,
	addToFavorites,
	removeFromFavorites,
	getFavorites,
	like,
}
