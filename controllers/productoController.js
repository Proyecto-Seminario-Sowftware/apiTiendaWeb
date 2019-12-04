const Producto = require("../models/Producto");
const multer = require("multer");
const shortid = require("shortid");

// Agregar producto

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Producto(req.body);

  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }

    await producto.save();
    res.status(200).send({ mensaje: "Se agrego el producto" });
  } catch (error) {
    res.status(422).send({ error: "No se agrego el producto" });
  }
};

// Configuracion de multer
const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagen no válido"));
    }
  }
};

// Obtener la configuración de multer y el campo de subida
const upload = multer(configuracionMulter).single("imagen");

// Subir un archivo al servidor
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      res.status(422).send({ error });
    }
    return next();
  });
};
