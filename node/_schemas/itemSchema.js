//Require Mongoose
const mongoose = require("mongoose");
const { getCategories } = require("../_services/category");
//Define a schema
const Schema = mongoose.Schema;
const CATEGORIES = getCategories();
const dummy_text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosq.";

// SCHEMAS
const itemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  category: { type: Number, required: true },
  sub_category: { type: Number, required: true },
  images: [String],
  description: { type: String, default: dummy_text },
  price: { type: Number, default: 1, required: true },
  rating: { type: Number, default: 4 },
  quantity: { type: Number, default: 1, required: true },
  measurement: { type: Number, required: true },
});

// MODELS
const ItemModel = mongoose.model("Items", itemSchema);

module.exports = { ItemModel, itemSchema };
