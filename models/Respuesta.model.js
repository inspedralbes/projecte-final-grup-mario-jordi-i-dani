const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Respuesta = new Schema({
  usertag: {
      type: String
  },
  tiempo: {
      type: String
  },
  puntuacion: {
    type: Number
  }, 
},{
    collection: 'respuestas'
});

module.exports = mongoose.model('Respuesta', Respuesta);