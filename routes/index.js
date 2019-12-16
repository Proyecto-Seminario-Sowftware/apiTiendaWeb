const express = require("express");
const router = express.Router();
// Importar los controller
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
const productoController = require("../controllers/productoController");
const compraController = require("../controllers/compraConstroller");

module.exports = function() {
  // Agregar un nuevo usuario
  router.post("/nuevoUsuario", usuarioController.nuevoUsuario);

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

  // Mostrar productos
  router.get("/mostrarProductos", productoController.mostrarProductos);

  // Mostar un solo id
  router.get(
    "/mostrarProducto/:idProducto",
    productoController.mostrarProducto
  );
  // Actulizar producto
  router.put(
    "/actualizarProducto/:idProducto",
    productoController.subirArchivo,
    productoController.actualizarProducto
  );

  // Eliminar producto
  router.delete(
    "/eliminarProducto/:idProducto",
    productoController.eliminarProducto
  );

  // Agregar compra
  router.post("/compra", compraController.agregarComprar);

  // Mostra todas las compras
  router.get("/mostrarCompras", compraController.mostrarCompras);

  // Eliminar compras
  router.delete("/eliminarCompras/:idCompra", compraController.eliminarCompra);

  return router;
};
