const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userInterestRelationSchema = new Schema({
	interestId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	score:{
		type: Number,
		required: true,
	}
}, )

const UserInterestRelation = mongoose.model('UserInterestRating', userInterestRelationSchema);

module.exports = UserInterestRelation;