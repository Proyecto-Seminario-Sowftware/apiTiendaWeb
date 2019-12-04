const express = require("express");
const router = express.Router();
// Importar los controller
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");

module.exports = function() {
  // Agregar un nuevo usuario
  router.post("/nuevoUsuario", usuarioController.nuevoUsuario);

  // Entrar
  router.get(
    "/productosUsuario",
    authController.verificarUsuario,
    authController.formularioProductosUsuario
  );

  // Verificar el login
  router.post("/usuario/iniciarSesion", authController.verificarUsuario);

  return router;
};
