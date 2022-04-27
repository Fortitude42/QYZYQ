const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
	id: {
		type: Number,
		unique: true,
		required: true,
	},
	firstname: {
		type: String,
		required: true,		
	},

	lastname: {
		type: String,
		trim: true,		
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	}
}, 

)


const User = mongoose.model('User', userSchema);

module.exports = User;