const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Creación del servidor de express
const app = express(); 

// Conexión base de datos
dbConnection();

// CORS
app.use(cors());


// Directiorio publico
// Muestra el html 
app.use( express.static('public'));

//Lectura y parseo del body que mandamos en alguna solicitud 
app.use(express.json());

// Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



// Escuchar peticiones http
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});