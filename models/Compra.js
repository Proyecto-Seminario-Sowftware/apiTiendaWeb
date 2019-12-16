const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const compraSchema = new Schema({
  producto: {
    type: Schema.ObjectId,
    ref: "Producto"
  },
  cantidad: {
    type: Number
  },
  
  total: { 
    type: Number
  }
});

module.exports = mongoose.model("Compra", compraSchema);
