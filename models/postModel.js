const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: [5, 'Title should be at least 5 characters'],
		maxlength: [250, 'Title shouldn\'t exceed 250 characters']
	},
	content: {
		type: String,
		required: true,
		minlength: [10, 'Content should be at least 10 characters'],
		maxlength: [2000, 'Content shouldn\'t exceed 50000 characters']
	},
	imageUrl: {
		type: String,
		required: true
	},
	tag: {
		type: String,
		required: true
	},
	likes: [{
		type: ObjectId,
		ref: "User"
	}],
	userId: {
		type: ObjectId,
		ref: "User"
	},
	comments: [{
		type: ObjectId,
		ref: "Comment"
	}]
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Post', postSchema);
