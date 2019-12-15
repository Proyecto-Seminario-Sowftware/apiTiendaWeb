const passport = require("passport");
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");
const Producto = require("../models/Producto");

// Autenticar el usuario
exports.autenticarUsuario = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send([user, "No has iniciado sesion", info]);
    }

    req.login(user, err => {
      res.send("Logged in");
    });
  })(req, res, next);
};

// Mostrar los datos al usuario
exports.productosUsuario = async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    if (!productos) return next();
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
  } else {
    res.status(403).send({ error: "No estas autenticado" });
  }
};

// Cerrar sesion del usuario
exports.cerrarSesion = (req, res) => {
  req.logout();
  console.log("Has cerrado sesión");
  return res.send({ mensaje: "Has cerrado sesión" });
};
