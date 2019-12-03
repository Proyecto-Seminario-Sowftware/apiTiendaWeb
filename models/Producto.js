const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({});

module.exports = mongoose.model("Producto", productoSchema);
