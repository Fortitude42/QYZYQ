const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const commentarySchema = new Schema({
	postId: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
}, )


const Comments = mongoose.model('Comments', commentarySchema);

module.exports = Comments;