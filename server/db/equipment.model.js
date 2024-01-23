// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentsSchema = new Schema({
  name: String,
  type: String,
  amount: Number,
  assigned_to: {
    type: String, default: ""
  }
});

module.exports = mongoose.model("Equipments", EquipmentsSchema);
