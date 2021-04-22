//Variables express
let express = require("express")
//Impostamos Controlador Usuario
let Usuario = require("../controllers/usuario")

//creamos la api

let api = express.Router();

//servicio para el login
api.post("/login", Usuario.login)
//servicio POST(registrar) http:localhost:3001/api/registrarUsuario
api.post("/registrarUsuario", Usuario.registrarUsuario)

//exportarmos el modulo
module.exports = api;