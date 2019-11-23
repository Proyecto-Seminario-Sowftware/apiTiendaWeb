const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycryt = require("bcryptjs");

const usuarioSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

// Hash del passord
usuarioSchema.pre("save", function(next) {
  const user = this;

  // Si el password fue modificado
  if (!user.isModified("password")) {
    return next();
  }
  bycryt.genSalt(10, (err, salt) => {
    // En caso de un error
    if (err) return next(err);

    //  Hacer el hash
    bycryt.hash(user.password, salt, (err, hash) => {
      if (err) return next();

      user.password = hash;
      next();
    });
  });
});

// Exportar modelo
module.exports = mongoose.model("Usuario", usuarioSchema);
