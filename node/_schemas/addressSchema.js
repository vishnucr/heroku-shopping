//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

// SCHEMAS
const addressSchema = new Schema({
	line_1: { type: String, default: '' },
	line_2: { type: String, default: '' },
	city: { type: String, default: '' },
	state: { type: String, default: '' },
	phone: { type: String, default: '' },
	pin: { type: String, default: '' }
})

module.exports = { addressSchema };