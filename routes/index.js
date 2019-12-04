const express = require("express");
const router = express.Router();
// Importar los controller
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
const productoController = require("../controllers/productoController");
module.exports = function() {
  // Agregar un nuevo usuario
  router.post("/nuevoUsuario", usuarioController.nuevoUsuario);

  // Entrar
  router.get(
    "/productosUsuario",
    authController.verificarUsuario,
    authController.productosUsuario
  );

  // Verificar el login
  router.post("/login", authController.autenticarUsuario);

  // Cerrar sesion para el usuario
  router.get("/cerrarSesion", authController.cerrarSesion);

  // Agregar un producto
  router.post(
    "/nuevoProducto",
    productoController.subirArchivo,
    productoController.nuevoProducto
  );

  return router;
};
