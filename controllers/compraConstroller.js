const Compra = require("../models/Compra");

// Agregar un pedido
exports.agregarComprar = async (req, res, next) => {
  const compra = new Compra(req.body);

  try {
    await compra.save();
    res.status(200).send({ mensaje: "Comprar Agregada" });
  } catch (error) {
    res.status(422).send({ error: "No se agrego tu compra" });
  }
};
// Mostrar todas las compras
exports.mostrarCompras = async (req, res, next) => {
  try {
    const compra = await Compra.find({}).populate("producto");

    res.status(200).send(compra);
  } catch (error) {
    res.status(422).send({ error: "No se mostraron tus compras" });
  }
};

exports.eliminarCompra = async (req, res, next) => {
  try {
    await Compra.findByIdAndDelete({ _id: req.params.idCompra });
    res.status(200).send({ mensaje: "Tu compra ha sido eliminado" });
  } catch (error) {
    res.status(422).send({ error: "No se elimino el producto" });
  }
};
