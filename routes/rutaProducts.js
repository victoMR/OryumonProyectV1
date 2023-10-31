const express = require('express');
const rutaProductos = express.Router();


rutaProductos.get('/productos', async (req, res) => {
    res.render('index');
}
);


module.exports = rutaProductos;
