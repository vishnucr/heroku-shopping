//Require Mongoose
const mongoose = require("mongoose");
const { addressSchema } = require('./addressSchema');

//Define a schema
const Schema = mongoose.Schema;

// SCHEMAS
const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	first_name: { type: String, default: '' },
	last_name: { type: String, default: '' },
	image: { type: String, default: '' },
	sex: { type: String, default: '' },
	username: { type: String, default: '' },
	age: { type: String, default: '' },
	email: { type: String, default: '' },
	phone: { type: String, default: '' },
	address: { type: addressSchema }
});


// MODELS
const UserModel = mongoose.model("Users", userSchema);

module.exports = { UserModel }
