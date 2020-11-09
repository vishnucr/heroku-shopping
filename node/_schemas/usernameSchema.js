//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

// SCHEMAS
const usernameSchema = new Schema({
	_id: Schema.Types.ObjectId,
	username: { type: String, required: true },
	password: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'Users' }
});

// MODELS
const UsernameModel = mongoose.model("Usernames", usernameSchema);

module.exports = { UsernameModel };
