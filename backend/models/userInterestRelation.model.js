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
	}
}, )

const UserInterestRelation = mongoose.model('UserInterestRelation', userInterestRelationSchema);

module.exports = UserInterestRelation;