//Require Mongoose
const mongoose = require("mongoose");
// const moment = require("moment");
const { addressSchema } = require('./addressSchema');
const { itemSchema } = require('./itemSchema');
//Define a schema
const Schema = mongoose.Schema;

// SCHEMAS
const orderSchema = new Schema({
    address: { type: addressSchema, required: true },
    items: [{ type: itemSchema, require: true }],
    date: { type: Date },
    delivery_date: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    is_completed: { type: Boolean, required: true, default: false },
    is_canceled: { type: Boolean, required: true, default: false },
    _id: Schema.Types.ObjectId

});


// MODELS
const OrderModel = mongoose.model("Orders", orderSchema);

module.exports = { OrderModel }
