const express = require("express");
const mongoose = require("mongoose");
const vue = require("vue");
const bodyParse = require("body-parser");
const routes = require("./routes/index");

// Crear la app
const app = express();

// Configuración de Mongoose
const mongooseURL =
  "mongodb+srv://luisdario500:Holamundo12345@presupuestos-ys9yr.mongodb.net/tiendapi";
mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Conectado a Mongoose");
});
mongoose.connection.on("error", err => {
  console.log("Error a conectar con Mongoose", err);
});

// Habilitar body-parse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// Implementar la ruta
app.use("/", routes());

// Puerto de coneccion
app.listen(8000, () => {
  console.log("Escuchando en el puerto 8000");
});
