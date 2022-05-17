const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const interestSchema = new Schema({
	type: {
		type: String,
		enum : ['book','movie', 'music'],
		required: true,
	},

	name: {
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
	
	image: {
		type: String,
	}
}, )


const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;