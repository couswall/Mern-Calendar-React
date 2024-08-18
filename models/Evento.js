const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

   title: {
        type: String,
        required: true,
   },
   notes: {
        type: String,
   },
   start: {
        type: Date,
        required: true,
   },
   end: {
        type: Date,
        required: true,
   },

   // Con esto sabremos quien hizo creó el evento
   user: {
        type: Schema.Types.ObjectId, // Esto es para indicarle a mongoose que hará una referencia a Usuario
        ref: 'Usuario',
        required: true,
   }

});

// Sobreescribe la serialización de JSON para que no aparezca __v y remplace _id por id en la respuesta de la petición
// Esto no modifica la información o los datos que se graban en la base de datos, solo de la respuesta del JSON
EventoSchema.method('toJSON', function(){
     // this.toObject() obtiene la referencia al objeto que se esta serializando
     const {_id, __v, ...object } = this.toObject();
     object.id = _id;

     return object;
});


module.exports = model('Evento', EventoSchema);