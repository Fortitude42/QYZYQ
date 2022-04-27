const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const interestSchema = new Schema({
	id: {
		type: Number,
		unique: true,
		required: true,
	},
	type: {
		type: String,
		enum : ['book','movie', 'music'],
		required: true,
	},

	name: {
		type: String,
		required: true,		
	},		

	description: {
		type: String,
		required: true,
	}
}, )


const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;