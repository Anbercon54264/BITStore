// variable para importar el modeio usuario
let Usuario = require("../modelo/usuario");
//variable para importar la libreria encriptar pass
let bcrypt = require("bcrypt-nodejs");

//funcion registra usuario

// Funcion para registrar el usuario
const registrarUsuario = (req, res) => {
  // sacamos los parametros del cuerpo de la API (ruta url)
  let params = req.body;
  // utilizamos el modelo usuario
  let usuario = new Usuario();
  // Si llego el password procedemos hacer el hash (encriptar)
  if (params.pass) {
    // Usamos el bcrypt para encriptar la contraseña
    bcrypt.hash(params.pass, null, null, function (err, hash) {
      // si se encripta registramos el usuario
      if (hash) {
        usuario.nombres = params.nombres;
        usuario.apellidos = params.apellidos;
        usuario.edad = params.edad;
        usuario.correo = params.correo;
        usuario.pass = hash;
        usuario.rol = params.rol;
        // Registramos los datos del usuario (los guardamos para enviarlos a mongo por el modelo)
        usuario.save((err, saveUsuario) => {
          if (err) {
            // si hay un error en el registro
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            // si el proceso se completo bien procedemos a guardar en el modelo los datos
            res.status(200).send({ usuario: saveUsuario });
          }
        });
      }
    });
  } else {
    // Damos respuesta con codigo HTTP de error y enviamos el error a consola
    res.status(405).send({ err: "No se guardo un dato" });
  }
};

//login
const login = (req, res) => {
  //variable para los parametros que llegan
  let params = req.body;
  //buscamos el usuario en bd
  Usuario.findOne({ correo: params.correo }, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (datosUsuario) {
        bcrypt.compare(params.pass, datosUsuario.pass, function (err, confirm) {
          if (confirm) {
            if (params.getToken) {
              res.status(200).send({ usuario: datosUsuario });
            } else {
              res
                .status(200)
                .send({ usuario: datosUsuario, mensaje: "Sin TOKEN" });
            }
          } else {
            res.status(401).send({ mensaje: "correo o password incorrecto" });
          }
        });
      } else {
        res.status(401).send({ mensaje: "correo o password incorrecto" });
      }
    }
  });
};
//exportamos los modulo
module.exports = {
  registrarUsuario,
  login,
};
