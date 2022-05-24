const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
	insterestId: {
		type: String,
		required: true,
	},
	authorId: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
}, )


const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;