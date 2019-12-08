const express = require("express");
const cookieSesion = require("cookie-session");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const routes = require("./routes/index");
const passport = require("./config/passport");

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

// Habilitar morgan
app.use(morgan("tiny"));
// Habiliar cors
app.use(cors());
// Habilitar body-parse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// Habiliar Cookie-Sesion
app.use(
  cookieSesion({
    name: "mysession",
    keys: ["vueauthrandomke"],
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  })
);

// Implementar Passport
app.use(passport.initialize());
app.use(passport.session());

// Implementar la ruta
app.use("/api", routes());

// history
const history = require("connect-history-api-fallback");
app.use(history);

// Puerto de coneccion
app.listen(8000, () => {
  console.log("Escuchando en el puerto 8000");
});
