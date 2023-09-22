const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
  },
});
produceSchema.set("timestamps", true);
module.exports = mongoose.model("product", produceSchema);
