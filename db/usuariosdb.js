const conexion = require("./conexiondb");

const Usuarios = require("../models/usuarios");

const crypto = require("crypto");

var {
  encryptPassword,
  compararPassword,
} = require("../middlewares/passwordsCheck");
const { hash } = require("bcrypt");

async function obtenerUsuarios() {
  let usuarios = [];
  try {
    let usuariosRef = await conexion.collection("usuarios").get();
    usuariosRef.forEach((usuariosRef) => {
      var user = new Usuarios(usuariosRef.id, usuariosRef.data());

      if (user.bandera == 0) {
        usuarios.push(user.ObtenerDatos);
      }
    });
  } catch (error) {
    console.log(
      "Error al recuperar usuarios en la base de datos DE USUARIOS" + err
    );
  }
  return usuarios;
}

async function obtenerUsuarioId(id) {
  let usuario = null;
  try {
    let usuarioRef = await conexion.collection("usuarios").doc(id).get();
    if (usuarioRef.exists) {
      usuario = new Usuarios(usuarioRef.id, usuarioRef.data());
    }
  } catch (error) {
    console.log(
      "Error al recuperar usuario en la base de datos DE USUARIOS" + err
    );
  }
  return usuario;
}

async function obtenerUsuarioUsuario(usuario) {
  let usuarioRef = null;
  try {
    usuarioRef = await conexion
      .collection("usuarios")
      .where("usuario", "==", usuario)
      .get();
  } catch (error) {
    console.log(
      "Error al recuperar usuario en la base de datos DE USUARIOS" + err
    );
  }
  return usuarioRef;
}

async function obtenerUsuarioEmail(email) {
  let usuarioRef = null;
  try {
    usuarioRef = await conexion
      .collection("usuarios")
      .where("email", "==", email)
      .get();
  } catch (error) {
    console.log(
      "Error al recuperar usuario en la base de datos DE USUARIOS" + err
    );
  }
  return usuarioRef;
}

async function nuevoUsuario(data) {
  var { hash, salt } = encryptPassword(data.password);
  data.password = hash;
  data.salt = salt;
  var error = 1;
  if (user.bandera == 0) {
    let user = new Usuarios(null, data);
    try {
      let usuarioRef = await conexion
        .collection("usuarios")
        .add(user.ObtenerDatos);
      user.id = usuarioRef.id;
      error = 0;
    } catch (error) {
      console.log(
        "Error al crear usuario en la base de datos DE USUARIOS" + err
      );
    }
  }
  return error;
}

async function actualizarUsuario(id, data) {
    var usuarioBuscar = await obtenerUsuarioId(id);
    if (usuarioBuscar != null) {
        var user = new Usuarios(id, data);
        var error = 1;
        if (user.bandera == 0) {
            try {
                await conexion.collection("usuarios").doc(id).update(user.ObtenerDatos);
                console.log("Registro actualizado");
                error = 0;
            } catch (error) {
                console.log("Error al actualizar usuario en la base de datos DE USUARIOS" + err);
                throw err; // Lanzar el error para que se propague hacia arriba
            }
        }
    }
    return error;
}

async function eliminarUsuario(id) {
  var error = 1;
  try {
    await conexion.collection("usuarios").doc(id).delete();
    error = 0;
  } catch (error) {
    console.log(
      "Error al eliminar usuario en la base de datos DE USUARIOS" + err
    );
  }
  return error;
}
