const express = require('express');
const path = require('path');
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

// * Cualquier solicitud a una ruta no definida, como /about, /login, etc., será capturada por esta ruta y se enviará el contenido de la carpeta public/index.html
// El método sendFile método envía un archivo al cliente 
// path.join(__dirname, 'public/index.html') construye la ruta absoluta al archivo index.html ubicado en el directorio public.
// __dirname es una variable global en Node.js que representa el directorio donde está ubicado el archivo actual.
/*
    Este código sirve como una ruta de "catch-all" (atrapa-todo) que, cuando se accede a cualquier ruta que no esté previamente definida en la aplicación, responderá con el archivo index.html. Este enfoque es común en aplicaciones de Single Page Application (SPA), como aquellas hechas con React, Angular o Vue, donde se requiere que todas las rutas vuelvan a cargar el mismo archivo HTML (generalmente el index.html), para que el enrutamiento del frontend maneje el resto.
*/
app.use('*', (req, res) => {
    res.sendFile( path.join(__dirname, 'public/index.html') );
});


// Escuchar peticiones http
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});