//variables de modulos
let express = require("express"); // todo el tema de servidores
let bodyParser = require("body-parser"); // analizar las urls de las api
let mongoose = require("mongoose"); // todo el tema daabase

//Variable para puerto del conexion del servidor
let port = process.env.port || 3001;
//variable de la aplicacion
let app = express();
//routes
let Usuario = require("./routes/usuario");
// conexion a DB
mongoose.connect("mongodb://localhost:27017/bitstoredb", { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(err);
        throw err;

    } else {
        console.log("Servidor DB: ON")
        app.listen(port, function () {
            console.log("SERVIDOR BACKEND FUNCIONANDO POR EL PUERTO :" + port);
        })
    }
});

//Analizar las url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//usar las rutas api
app.use("/api",Usuario)
// creamos modulo para importar
module.exports = app;

