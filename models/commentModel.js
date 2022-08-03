const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		minlength: [10, 'Comment text should be at least 10 characters'],
		maxlength: [2000, 'Comment text shouldn\'t exceed 2000 characters']
	},
	likes: [{
		type: ObjectId,
		ref: "User"
	}],
	userId: {
		type: ObjectId,
		ref: "User"
	},
	productId: {
		type: ObjectId,
		ref: "Product"
	},
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Comment', commentSchema);
