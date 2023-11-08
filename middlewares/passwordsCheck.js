const { log } = require('console');
var crypto = require('crypto');

function encriptarPassword(password) {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return {
        salt,
        hash
    }
};

function compararPassword(password, hash, salt) {
    var hashEvaluar = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hashEvaluar === hash;

};

function autorizado(req, res, cb) {;
    if (req.session.usuario || req.session.admin) {
      cb();
    } else {
        res.render("login/login", { mensaje: "No has iniciado sesion" });
    }
  };

  function admin(req, res, cb) {
    if (req.session.admin) {
      cb();
    } else {
        if(req.session.usuario){
            res.redirect("/usuarios/usuarios");
    }else{
        res.render("login/login", { mensaje: "No has iniciado sesion" });
    }
}
};

// var {salt,hash}=encriptarPassword('123456');
// // console.log(salt);
// console.log(hash);
// console.log(compararPassword('123456',hash,salt));

module.exports = {
    encriptarPassword,
    compararPassword,
    autorizado,
    admin
}