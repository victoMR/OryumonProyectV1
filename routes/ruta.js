const express = require('express');
const rutaGeneral = express.Router();
var zxcvbn = require('zxcvbn');

rutaGeneral.get('/', async (req, res) => {
    res.render("login/login", { mensaje: null });
});

rutaGeneral.get('/login', async (req, res) => {
    res.render("login/login", { mensaje: null });
}
);

rutaGeneral.get('/signup', async (req, res) => {
    res.render("login/signup", { mensaje: null });
}
);

rutaGeneral.get('/logout', async (req, res) => {
    req.session = null;
    res.redirect('/');
}
);

rutaGeneral.post("/usuarios/usuarios/nuevousuario", async (req, res) => {
    // const { nombre, apellido, email, password } = req.body;
    // const usuario = new Usuario({ nombre, apellido, email, password });
    // await usuario.save();
    res.redirect("/login");
}
);

rutaGeneral.post("/login", async (req, res) => {
    res.render("usuarioUI/principal");
}
);


module.exports = rutaGeneral;
