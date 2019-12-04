const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require("bcryptjs");

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
  bycrypt.genSalt(10, (err, salt) => {
    // En caso de un error
    if (err) return next(err);

    //  Hacer el hash
    bycrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next();

      user.password = hash;
      next();
    });
  });
});

// Hooks para poder pasar los errores de MongoBD hacia express validator
usuarioSchema.post("save", function(error, doc, next, res) {
  // Verificar que es un error de MongoDB
  if (error.name === "MongoError" && error.code === 11000) {
    res.sent({ mensaje: "Ya existe un usuario con ese correo electrónico" });
  } else {
    next(error);
  }
});

// Comparar el password
usuarioSchema.methods.compararPassword = function(candidatePassword) {
  return bycrypt.compareSync(candidatePassword, this.password);
};
usuarioSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bycrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  }).catch();
};

// Exportar modelo
module.exports = mongoose.model("Usuario", usuarioSchema);
