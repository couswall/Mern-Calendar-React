const { Schema, model, pluralize } = require('mongoose');

// Si deseamos que la colección no se pluralice en el nombre
// pluralize(null);

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

module.exports = model('Usuario', UsuarioSchema);