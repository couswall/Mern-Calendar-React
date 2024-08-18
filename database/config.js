const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
       await mongoose.connect(process.env.DB_CNN);
       console.log('Conexión exitosa');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de datos');
    }
};

module.exports = {
    dbConnection,
}