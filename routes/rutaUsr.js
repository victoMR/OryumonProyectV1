const express = require('express');
const rutaUsr = express.Router();


rutaUsr.get('/usuarios', async (req, res) => {
    res.render('index');
}
);


module.exports = rutaUsr;
