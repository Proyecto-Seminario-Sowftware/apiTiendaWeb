const passport = require("passport");
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");
const Producto = require("../models/Producto");

// Autenticar el usuario
exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/productosUsuario",
  failureRedirect: "/usuario/iniciarSesion",
  failureFlash: true,
  badRequestMessage: ["Debes ingresar ambos campos"]
});

// Mostrar los datos al usuario
exports.formularioProductosUsuario = async (req, res, next) => {
  try {
    const productos = await Producto.find({ autor: req.user._id });

    res.status(200).send(productos);
  } catch (error) {
    res.status(422).send({
      error: "Ha ocurrido un error al momento de obtener los productos"
    });
  }
};

// Verificar el usuario
exports.verificarUsuario = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // Redireccionar a login
  res.redirect("/usuario/iniciarSesion");
};
