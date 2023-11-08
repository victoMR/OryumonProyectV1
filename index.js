const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('cookie-session');
const dotenv = require('dotenv');
dotenv.config();

const ruta = require('./routes/ruta');
const rutaProductos = require('./routes/rutaProducts');
const rutaUsuarios = require('./routes/rutaUsr');

const app = express();

app.use(cors());

app.set("view engine", "ejs"); // para usar ejs como motor de plantillas

app.use(
    session({
        name: "session",
        keys: [process.env.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000,
    })
    );

app.use("/", express.static(path.join(__dirname,"/public"))) 

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', ruta);
app.use('/productos', rutaProductos);
app.use('/usuarios', rutaUsuarios);

port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en ; http://localhost:${port}`);
}
);

