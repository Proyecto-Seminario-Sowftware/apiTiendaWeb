const Usuario = require("../models/Usuario");

// crear un nuevo usuario
exports.nuevoUsuario = async (req, res, next) => {
  // Definir variable
  const usuario = new Usuario(req.body);

  // Almacenar los datos
  try {
    // Guardar el usuario
    await usuario.save();

    // Redireccinar valor
    res.status(200).send({ mensaje: "Se agrego el nuevo usuario" });
  } catch (error) {
    //   Mostrar un error si el usuario no se guarda
    res.status(422).send({ mensaje: "El usuario no se agrego correctamente" });
  }
};
