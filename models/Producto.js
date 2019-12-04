const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  nombre: {
    type: String,
    trim: true
  },
  precio: {
    type: Number
  },
  autor: {
    type: Schema.ObjectId,
    ref: "Usuarios",
    required: "El autor es importante"
  },
  imagen: {
    type: String
  }
});

module.exports = mongoose.model("Producto", productoSchema);
